import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import {ServerEntity} from "./ServerEntity";
import {GameEntity} from "./GameEntity";

class ConnectionEntity extends Typegoose {
    @prop({required: true})
    id: string;

    @prop({required: true})
    name: string;

    @prop({required: true})
    type: string;

    @prop()
    revoked: boolean;

    @prop({required: true})
    visibility: number;

}

class TimeTableEntity extends Typegoose {
    @arrayProp({items: String}) Mo;
    @arrayProp({items: String}) Tu;
    @arrayProp({items: String}) We;
    @arrayProp({items: String}) Th;
    @arrayProp({items: String}) Fr;
    @arrayProp({items: String}) Sa;
    @arrayProp({items: String}) Su;
}

export class UserEntity extends Typegoose {
    @prop({required: true})
    email: string;

    @prop({required: true})
    id: string;

    @prop({required: true})
    username: string;

    @prop()
    avatar: string;

    @prop()
    avatarUrl: string;

    @arrayProp({items: ConnectionEntity})
    connections: Array<ConnectionEntity>;

    @arrayProp({itemsRef: {name: "ServerEntity"}})
    servers: Array<Ref<ServerEntity>>;

    @prop({
        default: {
            Mo: [],
            Tu: [],
            We: [],
            Th: [],
            Fr: [],
            Sa: [],
            Su: []
        },
    })
    timeTable: TimeTableEntity;

    @arrayProp({itemsRef: {name: "GameEntity"}})
    games: Array<Ref<GameEntity>>;
}

export const User = new UserEntity().getModelForClass(UserEntity, {
    schemaOptions: {
        collection: "users"
    }
});
