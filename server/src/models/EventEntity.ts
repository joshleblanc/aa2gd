import {prop, Ref, Typegoose} from "typegoose";
import {ServerEntity} from "./ServerEntity";
import {GameEntity} from "./GameEntity";

export class EventEntity extends Typegoose {
    @prop({required: true})
    name: string;

    @prop({required: true})
    date: Date;

    @prop({ref: ServerEntity})
    server: Ref<ServerEntity>;

    @prop({ref: GameEntity})
    game: Ref<GameEntity>;
}

export const Event = new EventEntity().getModelForClass(EventEntity, {
    schemaOptions: {
        collection: "events"
    }
});
