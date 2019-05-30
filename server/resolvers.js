const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const FormData = require('form-data');
const mongoose = require("mongoose");
const moment = require('moment');

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

async function getGames(id) {
    const gamesResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`);
    const gamesResponseJson = await gamesResponse.json();
    const games = gamesResponseJson.response.games;
    console.log(id);
    if (games) {
        return await Promise.all(games.map(async g => {
            return await Game.findOneAndUpdate({appid: g.appid}, g, {upsert: true, new: true});
        }));
    }
}

const resolvers = {
      Query: {
          availableTimeTable: async (_, {id}, {token}) => {
              if (auth(token) && id) {
                  const users = await User.aggregate([{
                      $match: {
                          "servers": new mongoose.Types.ObjectId(id)
                      }
                  }]);
                  const times = {};
                  for (let i = 0; i < 24; i++) {
                      const timeString = `${i}:00`;
                      times[timeString] = times[timeString] || {};
                      moment.weekdaysMin().forEach(day => {
                          times[timeString][day] = users.reduce((total, user) => {
                              return user.timeTable[day].includes(timeString) ? total + 1 : total;
                          }, 0);
                      });
                  }
                  return JSON.stringify(times);
              }
              return null;
          },
          games: async (_, _ctx, {token}) => {
              if (auth(token)) {
                  return await Game.find();
              }
          },
          availableUsers: async (_, {serverId, gameId, date}, {token}) => {
              if (auth(token) && serverId && gameId) {
                  const users = await User.aggregate([{
                      $match: {
                          "servers": new mongoose.Types.ObjectId(serverId)
                      }
                  }, {
                      $or: [
                          {"games": new mongoose.Types.ObjectId(gameId)},
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
                  const userRequest = await discord_req("users/@me", json.access_token);
                  const user = await userRequest.json();
                  const connectionsRequest = await discord_req("users/@me/connections", json.access_token);
                  const connections = await connectionsRequest.json();
                  const serversRequest = await discord_req("users/@me/guilds", json.access_token);
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
                  const users = await User.aggregate([{
                      $match: {
                          "servers": new mongoose.Types.ObjectId(id)
                      }
                  }]);

                  server.users = users;
                  return server;
              } else {
                  return null;
              }
          },
          currentUser: async (a, {token: passedToken}, {token}) => {
              if (token && passedToken) {
                  const decoded = jwt.verify(passedToken, process.env.JWT_SECRET);
                  const r = await discord_req("users/@me", decoded.access_token);
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
      },
      Mutation: {
          setSteamID: async (_, {id}, {token}) => {
              const record = auth(token);
              if (record) {
                  const user = await User.findById(record._id);
                  let games;
                  try {
                      games = await getGames(id);
                  } catch
                    (e) {
                      const resp = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${process.env.STEAM_KEY}&vanityurl=${id}`);
                      const json = await resp.json();
                      if (json.response.success === 1) {
                          games = await getGames(json.response.steamid);
                      } else {
                          throw new Error("Invalid steam id");
                      }
                  }

                  await user.update({
                      games: games
                  });
                  console.log(user);
                  return User.findById(record._id).populate({
                      path: 'servers',
                      populate: {path: 'events'}
                  }).populate({
                      path: 'games',
                      populate: {path: 'events'}
                  }).exec();
              }
          },
          createEvent: async (_, fields, {token}) => {
              const record = auth(token);
              if (record) {
                  const game = await Game.findOne({_id: fields.game});
                  const server = await Server.findOne({_id: fields.server});
                  const event = new Event({
                      name: fields.name,
                      date: fields.date,
                      server: server,
                      game: game
                  });
                  await event.save();
                  game.events.push(event);
                  server.events.push(evtent);
                  game.save();
                  server.save();
                  return event;
              }
          },
          updateTimetable:
            async (_, {time, day, offset}, {token}) => {
                const record = auth(token);
                const momentTime = moment(time, "HH:mm");
                console.log(momentTime);
                momentTime.utcOffset(offset);
                momentTime.set('day', day);
                momentTime.set('hour', time.split(':')[0]);
                momentTime.utc();
                console.log(day, time, momentTime.format());
                const utcHour = momentTime.hour();
                const utcDay = moment.weekdaysMin()[momentTime.day()];
                const utcTime = `${utcHour}:00`;
                if (record) {
                    const user = await User.findOne({_id: record._id});
                    if (user.timeTable[utcDay].includes(utcTime)) {
                        user.timeTable[utcDay] = user.timeTable[utcDay].filter(t => t !== utcTime);
                    } else {
                        user.timeTable[utcDay].push(utcTime);
                    }
                    user.save();
                    return user;
                }
            },
          login:
            async (_, {email, password}) => {
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
          register:
            async (_, {email, password, confirmPassword}) => {
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
  }
;

module.exports = resolvers;
