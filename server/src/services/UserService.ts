import { Service } from "typedi";
import { User, UserModel } from "../models/User";
import * as jwt from "jsonwebtoken";
import { discordReq, getGames, auth } from "../lib/utils";
import { Types } from "mongoose";
import * as moment from "moment";
import { ServerModel } from "../models/Server";
import * as FormData from "form-data";
import fetch from "node-fetch";

@Service()
export class UserService {
  async getCurrentUser(token: string): Promise<User> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const r = await discordReq("users/@me", decoded.access_token);
    const json = await r.json();
    return UserModel.findOne({ id: json.id })
      .populate({
        path: "servers",
        populate: { path: "events" }
      })
      .populate({
        path: "games",
        populate: { path: "events" }
      })
      .exec();
  }

  async getAvailableUsers(serverId: string, gameId: string, date: string) {
    const users = await UserModel.aggregate([
      {
        $match: {
          servers: new Types.ObjectId(serverId)
        }
      },
      {
        $match: {
          $or: [{ games: new Types.ObjectId(gameId) }, { games: null }]
        }
      }
    ]);
    const momentDate = moment(date);
    momentDate.utc();
    const day = moment.weekdaysMin()[momentDate.day()];
    const hour = momentDate.hour();
    const time = `${hour}:00`;
    return users
      .reduce((total, user) => {
        if (user.timeTable) {
          return user.timeTable[day].includes(time) ? total + 1 : total;
        } else {
          return total;
        }
      }, 0)
      .toString();
  }

  async getDiscordToken(code: string, origin: string): Promise<string> {
    try {
      console.log(code);
      const data = new FormData();
      data.append("client_id", process.env.DISCORD_CLIENT_ID);
      data.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
      data.append("redirect_uri", `${origin}/authenticate`);
      data.append("grant_type", "authorization_code");
      data.append("scope", "email identify guilds connections");
      data.append("code", code);
      const r = await fetch(`https://discordapp.com/api/oauth2/token`, {
        method: "POST",
        body: data
      });

      const json = await r.json();
      const userRequest = await discordReq("users/@me", json.access_token);
      const user = await userRequest.json();
      const connectionsRequest = await discordReq(
        "users/@me/connections",
        json.access_token
      );
      const connections = await connectionsRequest.json();
      const serversRequest = await discordReq(
        "users/@me/guilds",
        json.access_token
      );
      let servers = await serversRequest.json();
      servers = await Promise.all(
        servers.map(async s => {
          return await ServerModel.findOneAndUpdate({ id: s.id }, s, {
            upsert: true,
            new: true
          });
        })
      );

      const newUser = await UserModel.findOneAndUpdate(
        { id: user.id },
        {
          ...user,
          avatarUrl: `http://cdn.discordapp.com/avatars/${user.id}/${
            user.avatar
          }.png`,
          connections: connections.filter(c => c.visibility === 1),
          servers
        },
        { upsert: true, new: true }
      );

      const steamConnection = connections.find(c => c.type === "steam");
      if (steamConnection) {
        const games = await getGames(steamConnection.id);
        if (games) {
          await newUser.update({ games });
        }
      }

      if (json.error) {
        throw new Error("Invalid code");
      } else {
        return jwt.sign({ ...json, _id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: json.expires_in
        });
      }
    } catch (e) {
      console.error(e);
      console.log("Failed to get token");
    }
  }

  async setSteamID(name: string, token: string): Promise<User> {
    const record = auth(token);
    console.log(record);
    const user = await UserModel.findById(record._id);
    let games;
    try {
      games = await getGames(name);
    } catch (e) {
      const resp = await fetch(
        `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${
          process.env.STEAM_KEY
        }&vanityurl=${name}`
      );
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
    return UserModel.findById(record._id)
      .populate({
        path: "servers",
        populate: { path: "events" }
      })
      .populate({
        path: "games",
        populate: { path: "events" }
      })
      .exec();
  }

  async updateTimetable(time, day, offset, token) {
    const record = auth(token);
    const momentTime = moment(time, "HH:mm");
    console.log(momentTime);
    momentTime.utcOffset(offset);
    momentTime.set("day", day);
    momentTime.set("hour", time.split(":")[0]);
    momentTime.utc();
    console.log(day, time, momentTime.format());
    const utcHour = momentTime.hour();
    const utcDay = moment.weekdaysMin()[momentTime.day()];
    const utcTime = `${utcHour}:00`;
    const user = await UserModel.findOne({ _id: record._id });
    if (user.timeTable[utcDay].includes(utcTime)) {
      user.timeTable[utcDay] = user.timeTable[utcDay].filter(
        t => t !== utcTime
      );
    } else {
      user.timeTable[utcDay].push(utcTime);
    }
    user.save();
    return user;
  }
}
