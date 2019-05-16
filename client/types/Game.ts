import Event from './Event';

type Game = {
    _id: string,
    appid: Number,
    name: string,
    playtime_forever: Number,
    iconUrl: string,
    logoUrl: string,
    events: Array<Event>
}

export default Game;