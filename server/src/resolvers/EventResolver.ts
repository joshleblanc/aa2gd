import {Event, EventModel} from "../models/Event";
import {Query, Resolver, Args, Mutation, ArgsType, Field, Authorized} from "type-graphql";
import { EventService } from "../services/EventService";
import { Service } from "typedi";

@ArgsType()
export class CreateEventArgs {
    @Field()
    game: string;

    @Field()
    server: string;

    @Field()
    name: string;

    @Field()
    date: string;
}

@Service()
@Resolver(of => Event)
export class EventResolver {
    constructor(private readonly eventService:EventService) {}

    @Query(returns => [Event])
    async events():Promise<Event[]> {
        return this.eventService.getAll();
    }

    @Authorized()
    @Mutation(returns => Event)
    async createEvent(@Args() fields: CreateEventArgs) {
        return this.eventService.create(fields)
    }
}
