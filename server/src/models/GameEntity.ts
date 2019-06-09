import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import {EventEntity} from "./EventEntity";

function makeUrl(id, hash) {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${hash}.jpg`;
}

export class GameEntity extends Typegoose {
    @prop({required: true})
    appid: number;

    @prop({required: true})
    name: string;

    @prop({required: true})
    playtime_forever: number;

    @prop()
    img_icon_url: string;

    @prop()
    img_logo_url: string;

    @prop()
    has_community_visible_stats: boolean;

    @arrayProp({itemsRef: "Event"})
    events: Array<Ref<EventEntity>>;

    @prop()
    get iconUrl() {
        return makeUrl(this.appid, this.img_icon_url);
    }

    @prop()
    get logoUrl() {
        return makeUrl(this.appid, this.img_logo_url);
    }
}

export const Game = new GameEntity().getModelForClass(GameEntity, {
    schemaOptions: {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
});