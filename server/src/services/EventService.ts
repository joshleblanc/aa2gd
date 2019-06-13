import { Service } from "typedi";
import { EventModel, Event } from "../models/Event";
import { CreateEventArgs } from "../resolvers/EventResolver";
import { GameModel } from "../models/Game";
import { ServerModel } from "../models/Server";

@Service()
export class EventService {
  async getAll(): Promise<Array<Event>> {
    return EventModel.find({});
  }

  async create(fields: CreateEventArgs): Promise<Event> {
    const game = await GameModel.findOne({ _id: fields.game });
    const server = await ServerModel.findOne({ _id: fields.server });
    const event = new EventModel({
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
