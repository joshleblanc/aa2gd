import { Event } from "../models/Event";
import {
  Query,
  Resolver,
  Args,
  Mutation,
  ArgsType,
  Field,
  Authorized,
  ID,
  Ctx
} from "type-graphql";
import { EventService } from "../services/EventService";
import { Service } from "typedi";
import { ServerService } from "../services/ServerService";
import { WebhookService } from "../services/WebhookService";
import { GameService } from "../services/GameService";
import moment from "moment";
import { fetch } from "apollo-server-env";

@ArgsType()
export class CreateEventArgs {
  @Field(type => ID)
  game: string;

  @Field(type => ID)
  server: string;

  @Field()
  name: string;

  @Field()
  date: string;
}

@Service()
@Resolver(of => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly serverService: ServerService,
    private readonly webhookService: WebhookService,
    private readonly gameService: GameService
  ) {}

  @Query(returns => [Event])
  async events(): Promise<Event[]> {
    return this.eventService.getAll();
  }

  @Authorized()
  @Mutation(returns => Event)
  async createEvent(@Args() fields: CreateEventArgs, @Ctx() context) {
    const event = await this.eventService.create(fields);
    const server = await this.serverService.get(fields.server);
    const game = await this.gameService.get(fields.game);
    const date = moment(event.date);
    const body = {
      embeds: [
        {
          title: "Famti.me",
          description: "An event has been created on Famti.me!",
          url: `${context.origin}/event?id=${event._id}`,
          color: 7971883,
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: "Server",
              value: server.name
            },
            {
              name: "Game",
              value: game.name
            },
            {
              name: "Date",
              value: date.format("dddd, MMMM Do YYYY")
            },
            {
              name: "Time",
              value: date.utc().format("h:mm:ss a UTC")
            }
          ]
        }
      ]
    };

    const webhooks = await this.webhookService.find({
      server: fields.server
    });
    const promises = webhooks.map(webhook => {
      return fetch(webhook.url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
      });
    });
    const tmp = await Promise.all(promises);
    console.log(tmp);
    return event;
  }
}
