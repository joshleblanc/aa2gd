const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
import { Game } from '../models/GameEntity';
module.exports = {
    discordReq: async function(path, token) {
        const api_url = "https://discordapp.com/api";
        return fetch(`${api_url}/${path}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    auth: function(token) {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET);
        } else {
            return false;
        }
    },
    getGames: async function(id) {
        const gamesResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`);
        const gamesResponseJson = await gamesResponse.json();
        const games = gamesResponseJson.response.games;
        if (games) {
            return Promise.all(games.map(async g => {
                return await Game.findOneAndUpdate({appid: g.appid}, g, {upsert: true, new: true});
            }));
        }
    }
};
