import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import {Event} from "./Event";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectID } from "mongodb";

function makeUrl(id, hash) {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${hash}.jpg`;
}

@ObjectType()
export class Game extends Typegoose {

    @Field(type => ID)
    readonly _id: ObjectID;

    @prop({required: true})
    @Field(type => Number)
    appid: number;

    @prop({required: true})
    @Field()
    name: string;

    @prop({required: true})
    @Field()
    playtime_forever: number;

    @prop()
    @Field()
    img_icon_url: string;

    @prop()
    @Field()
    img_logo_url: string;

    @prop()
    @Field()
    has_community_visible_stats: boolean;

    @arrayProp({itemsRef: { name: "Event" }})
    @Field(type => [Event], { nullable: true })
    events: Array<Ref<Event>>;

    // @prop()
    // @Field(type => String)
    // iconUrl() {
    //     return makeUrl(this.appid, this.img_icon_url);
    // }

    // @prop()
    // @Field(type => String)
    // logoUrl() {
    //     return makeUrl(this.appid, this.img_logo_url);
    // }
}

export const GameModel = new Game().getModelForClass(Game, {
    schemaOptions: {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
        collection: "games"
    }
});
