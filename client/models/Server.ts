import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import { Event } from './Event';
import moment from 'moment';
import { ObjectType, Field, ID, Root } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Server extends Typegoose {

    @Field(type => ID)
    readonly _id: ObjectId;
    @prop({ required: true })
    @Field()
    id: string;

    @prop({ required: true })
    @Field({ nullable: true })
    name?: string;

    @prop()
    @Field({ nullable: true })
    icon?: string;

    @prop({ required: true })
    @Field()
    owner: boolean;

    @arrayProp({ itemsRef: { name: "Event" } })
    @Field(type => [Event], { nullable: true })
    events?: Array<Ref<Event>>;

    @arrayProp({ itemsRef: { name: "User" }})
    @Field(type => [User])
    users?: Array<Ref<User>>;

    // @prop()
    // @Field(type => String)
    // iconUrl(@Root() server:Server): string {
    //     return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
    // }

    // @prop()
    // @Field(type => [Event], { nullable: true })
    // pastEvents(): Array<Ref<Event>> {
    //     const today = moment();
    //     return this.events.filter((event:Event) => {
    //         const eventDate = moment(event.date);
    //         return eventDate.diff(today, 'hours') < -3;
    //     });
    // }
    //
    // @prop()
    // @Field(type => [Event], { nullable: true })
    // futureEvents(): Array<Ref<Event>> {
    //     const today = moment();
    //     return this.events.filter((event:Event) => {
    //         const eventDate = moment(event.date);
    //         return eventDate.isAfter(today);
    //     });
    // }
    //

    @prop()
    @Field(type => String, { nullable: true })
    currentEvents(): string {
        return 'test';
        // const today = moment();
        // return this.events.filter((event:Event) => {
        //     const eventDate = moment(event.date);
        //     const diff = eventDate.diff(today, 'hours');
        //     return diff > -3 && diff <= 0;
        // });
    }
}

export const ServerModel = new Server().getModelForClass(Server, {
    schemaOptions: {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
        collection: "servers"
    }
});
