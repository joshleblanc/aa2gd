import Server from "./Server";
import Game from "./Game";
import TimeTable from "./TimeTable";
import Connection from "./Connection";

type User = {
    _id: string,
    username: string,
    id: string,
    avatar: string,
    avatarUrl: string,
    email: string,
    connections: Array<Connection>,
    servers: Array<Server>,
    timeTable: TimeTable,
    games: Array<Game>
}

export default User;