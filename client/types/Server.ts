import Event from './Event';
import User from "./User";

type Server = {
    _id: string,
    events?: Array<Event>
    name: string,
    id: string,
    icon: string,
    iconUrl: string,
    owner: boolean,
    users: Array<User>,
    currentEvents?: Array<Event>,
    futureEvents?: Array<Event>,
    pastEvents?: Array<Event>
}

export default Server;