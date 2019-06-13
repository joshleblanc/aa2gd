import {Game} from "../../models/GameEntity";

const moment = require('moment');
const {getGames, auth} = require('../utils');
import {User} from '../../models/UserEntity';
import fetch from 'node-fetch';
import {Server} from "../../models/ServerEntity";
import {Event} from "../../models/EventEntity";

export const setSteamID = async (_, {id}, {token}) => {
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
};

export const createEvent = async (_, fields, {token}) => {
    const record = auth(token);
    if (record) {
        const game = await Game.findOne({_id: fields.game});
        const server = await Server.findOne({_id: fields.ServerEntity});
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
}

export const updateTimetable = async (_, {time, day, offset}, {token}) => {
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
};
