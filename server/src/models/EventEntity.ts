import {prop, Ref, Typegoose} from "typegoose";
import {ServerEntity} from "./ServerEntity";
import {GameEntity} from "./GameEntity";
import {ObjectType, Field, ID} from "type-graphql";
import {Types} from 'mongoose';

@ObjectType()
export class EventEntity extends Typegoose {

    @Field(type => ID)
    readonly _id: Types.ObjectId;

    @prop()
    @Field()
    name: string;

    @prop()
    @Field(type => Date,)
    date: Date;

    @prop({ref: {name: "ServerEntity"}})
    @Field(type => ServerEntity)
    server: Ref<ServerEntity>;

    @prop({ref: {name: "GameEntity"}})
    @Field(type => GameEntity)
    game: Ref<GameEntity>;
}

export const Event = new EventEntity().getModelForClass(EventEntity, {
    schemaOptions: {
        collection: "events"
    }
});
