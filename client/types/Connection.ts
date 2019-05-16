import User from "./User";
import Event from "./Event";

type Connection = {
    _id: string,
    id: string,
    name: string,
    icon: string,
    iconUrl: string,
    owner: boolean,
    users: Array<User>,
    events: Array<Event>,
    type: string
}

export default Connection;