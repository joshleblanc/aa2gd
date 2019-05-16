const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const FormData = require('form-data');
const mongoose = require("mongoose");

const Server = mongoose.model('Server');
const Game = mongoose.model('Game');
const User = mongoose.model('User');
const Event = mongoose.model('Event');

async function discord_req(path, token) {
    const api_url = "https://discordapp.com/api";
    return fetch(`${api_url}/${path}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

function auth(token) {
    if (token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    } else {
        return false;
    }
}

const resolvers = {
    Query: {
        hello: (root, args, context) => {
            return "Hello, world!";
        },
        getDiscordToken: async (_, {code}, {origin}) => {
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

            json = await r.json();
            const userRequest = await discord_req("users/@me", json.access_token);
            const user = await userRequest.json();
            const connectionsRequest = await discord_req("users/@me/connections", json.access_token);
            const connections = await connectionsRequest.json();
            const serversRequest = await discord_req("users/@me/guilds", json.access_token);
            let servers = await serversRequest.json();

            servers = await Promise.all(servers.map(async s => {
                return await Server.findOneAndUpdate({id: s.id}, s, {upsert: true});
            }));

            const steamConnection = connections.find(c => c.type === 'steam');
            let games = [];
            if (steamConnection) {
                const gamesResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamConnection.id}&format=json&include_appinfo=1&include_played_free_games=1`);
                const gamesResponseJson = await gamesResponse.json();
                games = gamesResponseJson.response.games;
            }


            games = await Promise.all(games.map(async g => {
                return await Game.findOneAndUpdate({ appid: g.appid }, g, { upsert: true, new: true });
            }));

            const newUser = await User.findOneAndUpdate({id: user.id}, {
                ...user,
                avatarUrl: `http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
                connections: connections.filter(c => c.visibility === 1),
                servers,
                timeTable: {
                    Mo: [],
                    Tu: [],
                    We: [],
                    Th: [],
                    Fr: [],
                    Sa: [],
                    Su: []
                },
                games
            }, {upsert: true, new: true});

            console.log(connections);
            if (json.error) {
                throw new Error("Invalid code");
            } else {
                return jwt.sign({...json, _id: newUser._id}, process.env.JWT_SECRET, {expiresIn: json.expires_in});
            }
        },
        user: async (_, {id}, {token}) => {
            if (auth(token)) {
                return await User.findOne({id});
            }
        },
        events: async (_, {}, { token }) => {
            if(auth(token)) {
                const events = await Event.find({}).populate('game').populate('server.tsx').exec();
                return events;
            }
        },
        server: async (_, {id}, {token}) => {
            if (auth(token)) {
                console.log(id);
                const server = await Server.findOne({id});
                const users = await User.aggregate([{
                    $match: {
                        "servers.id": id
                    }
                }]);
                server.users = users;
                return server;
            } else {
                return null;
            }
        },
        currentUser: async (a, {token: passedToken}, {token}) => {
            console.log("token:", token, passedToken);
            if (token && passedToken) {
                const decoded = jwt.verify(passedToken, process.env.JWT_SECRET);
                console.log(decoded);
                const r = await discord_req("users/@me", decoded.access_token);
                const json = await r.json();
                return User.findOne({id: json.id}).populate({
                    path: 'servers',
                    populate: { path: 'events'}
                }).populate({
                    path: 'games',
                    populate: { path: 'events'}
                }).exec();
            } else {
                return null;
            }

        }
    },
    Mutation: {
        createEvent: async (_, fields, { token }) => {
            const record = auth(token);
            if(record) {
                const game = await Game.findOne({ _id: fields.game });
                const server = await Server.findOne({ _id: fields.server });
                const event = new Event({
                    name: fields.name,
                    date: fields.date,
                    server: server,
                    game: game
                });
                await event.save();
                game.events.push(event);
                server.events.push(event);
                game.save();
                server.save();
                return event;
            }
        },
        updateTimetable: async (_, {time, day}, {token}) => {
            const record = auth(token);
            if (record) {
                const user = await User.findOne({_id: record._id});
                if (user.timeTable[day].includes(time)) {
                    user.timeTable[day] = user.timeTable[day].filter(t => t !== time);
                } else {
                    user.timeTable[day].push(time);
                }
                user.save();
                return user;
            }
        },
        login: async (_, {email, password}) => {
            const user = await User.findOne({email: email});
            if (!user) {
                throw "User not found";
            }
            const match = await user.comparePassword(password);
            if (match) {
                return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
            } else {
                throw "Incorrect password"
            }
        },
        register: async (_, {email, password, confirmPassword}) => {
            if (password !== confirmPassword) {
                throw new Error("Passwords don't match");
            }

            const user = new User({
                email: email,
                password: password,
            });

            await user.save();
            return true;
        }
    }
};

module.exports = resolvers;