import Server from "./Server";
import Game from "./Game";

type Event = {
    _id: string,
    name?: string,
    date: string,
    server?: Server,
    game?: Game
}

export default Event;