import {prop, Ref, Typegoose} from "typegoose";
import {Server} from "./Server";
import {Game} from "./Game";
import {ObjectType, Field, ID} from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class Event extends Typegoose {

    @Field(type => ID)
    readonly _id: ObjectId;

    @prop()
    @Field()
    name: string;

    @prop()
    @Field(type => Date)
    date: Date;

    @prop({ref: {name: "Server"}})
    @Field(type => Server)
    server: Ref<Server>;

    @prop({ref: {name: "Game"}})
    @Field(type => Game)
    game: Ref<Game>;
}

export const EventModel = new Event().getModelForClass(Event, {
    schemaOptions: {
        collection: "events"
    }
});
