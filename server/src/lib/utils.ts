const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
import { GameModel } from "../models/Game";
import { AuthChecker } from "type-graphql";

export interface ContextType {
  token?: string;
}

export const discordReq = async function(path, token) {
  const api_url = "https://discordapp.com/api";
  return fetch(`${api_url}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const auth = function(token: string): any {
  console.log(token);
  if (token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  } else {
    return false;
  }
};

export const authChecker: AuthChecker<ContextType> = function({ context }) {
  const token = context.token;
  return auth(token);
};

export const getGames = async function(id) {
  const gamesResponse = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${
      process.env.STEAM_KEY
    }&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`
  );
  const gamesResponseJson = await gamesResponse.json();
  const games = gamesResponseJson.response.games;
  if (games) {
    return Promise.all(
      games.map(async g => {
        return await GameModel.findOneAndUpdate({ appid: g.appid }, g, {
          upsert: true,
          new: true
        });
      })
    );
  }
};
