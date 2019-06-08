const moment = require('moment');
const { model, Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const { getGames, discordReq, auth } = require('../utils');

const Game = model('Game');
const Webhook = model('Webhook');
const User = model('User');
const Server = model('Server');

module.exports = {
    availableTimeTable: async (_, {id}, {token}) => {
        if (auth(token) && id) {
            const users = await User.aggregate([{
                $match: {
                    "servers": new Types.ObjectId(id)
                }
            }]);
            const times = {};
            for (let i = 0; i < 24; i++) {
                const timeString = `${i}:00`;
                times[timeString] = times[timeString] || {};
                moment.weekdaysMin().forEach(day => {
                    times[timeString][day] = users.reduce((total, user) => {
                        if(user.timeTable) {
                            return user.timeTable[day].includes(timeString) ? total + 1 : total;
                        } else {
                            return total;
                        }

                    }, 0);
                });
            }
            return JSON.stringify(times);
        }
        return null;
    },
    games: async (_, _params, {token}) => {
        if (auth(token)) {
            return await Game.find();
        }
    },
    webhooks: async (_, { userId, serverId }, { token }) => {
        if(auth(token) && serverId && userId) {
            return await Webhook.find({ creator: userId, server: serverId });
        }
    },
    availableUsers: async (_, {serverId, gameId, date}, {token}) => {
        if (auth(token) && serverId && gameId) {
            const users = await User.aggregate([{
                $match: {
                    "servers": new Types.ObjectId(serverId)
                }
            }, {
                $or: [
                    {"games": new Types.ObjectId(gameId)},
                    {"games": null}
                ]
            }]);
            const momentDate = moment(date);
            momentDate.utc();
            const day = moment.weekdaysMin()[momentDate.day()];
            const hour = momentDate.hour();
            const time = `${hour}:00`;
            console.log("Available at:", `${day}, ${time}`, users);
            return users.reduce((total, user) => {
                return user.timeTable[day].includes(time) ? total + 1 : total;
            }, 0).toString();
        }

        return "";
    },
    getDiscordToken: async (_, {code}, {origin}) => {
        try {
            const data = new FormData();
            data.append('client_id', process.env.DISCORD_CLIENT_ID);
            data.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
            data.append('redirect_uri', `${origin}/authenticate`);
            data.append('grant_type', 'authorization_code');
            data.append('scope', 'email identify guilds connections');
            data.append('code', code);
            const r = await fetch(`https://discordapp.com/api/oauth2/token`, {
                method: "POST",
                body: data,
            });

            const json = await r.json();
            const userRequest = await discordReq("users/@me", json.access_token);
            const user = await userRequest.json();
            const connectionsRequest = await discordReq("users/@me/connections", json.access_token);
            const connections = await connectionsRequest.json();
            const serversRequest = await discordReq("users/@me/guilds", json.access_token);
            let servers = await serversRequest.json();
            servers = await Promise.all(servers.map(async s => {
                return await Server.findOneAndUpdate({id: s.id}, s, {upsert: true, new: true});
            }));

            const newUser = await User.findOneAndUpdate({id: user.id}, {
                ...user,
                avatarUrl: `http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                connections: connections.filter(c => c.visibility === 1),
                servers,
            }, {upsert: true, new: true});

            const steamConnection = connections.find(c => c.type === 'steam');
            if (steamConnection) {
                const games = await getGames(steamConnection.id);
                if (games) {
                    await newUser.update({games});
                }
            }

            if (json.error) {
                throw new Error("Invalid code");
            } else {
                console.log(json);
                return jwt.sign({...json, _id: newUser._id}, process.env.JWT_SECRET, {expiresIn: json.expires_in});
            }
        } catch (e) {
            console.error(e);
            console.log("Failed to get token");
        }
    },
    user: async (_, {id}, {token}) => {
        if (auth(token)) {
            return await User.findOne({id});
        }
    },
    events: async (_, {}, {token}) => {
        if (auth(token)) {
            return await Event.find({}).populate('game').populate('server').exec();
        }
    },
    server: async (_, {id}, {token}) => {
        if (auth(token) && id.length > 0) {
            const server = await Server.findOne({_id: id}).populate({
                path: 'events',
                populate: {
                    path: "game"
                }
            }).exec();
            server.users = await User.aggregate([{
                $match: {
                    "servers": new Types.ObjectId(id)
                }
            }]);
            return server;
        } else {
            return null;
        }
    },
    currentUser: async (a, {token: passedToken}, {token}) => {
        if (token && passedToken) {
            const decoded = jwt.verify(passedToken, process.env.JWT_SECRET);
            const r = await discordReq("users/@me", decoded.access_token);
            const json = await r.json();
            return User.findOne({id: json.id}).populate({
                path: 'servers',
                populate: {path: 'events'}
            }).populate({
                path: 'games',
                populate: {path: 'events'}
            }).exec();
        } else {
            return null;
        }

    }
};