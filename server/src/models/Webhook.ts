import {prop, Ref, Typegoose} from "typegoose";
import {User} from "./User";
import {Server} from "./Server";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectID } from "mongodb";

@ObjectType()
export class Webhook extends Typegoose {
    @Field(type => ID)
    readonly _id: ObjectID;

    @prop({required: true})
    @Field()
    url: string;

    @prop({required: true})
    @Field()
    name: string;

    @prop({ref: {name: "User"}})
    @Field(type => User)
    creator: Ref<User>;

    @prop({ref: {name: "Server"}})
    @Field(type => Server)
    server: Ref<Server>;
}

export const WebhookModel = new Webhook().getModelForClass(Webhook, {
    schemaOptions: {
        collection: "webhooks"
    }
});
