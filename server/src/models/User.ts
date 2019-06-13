import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import {Server} from "./Server";
import {Game} from "./Game";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectID } from "mongodb";

@ObjectType()
class Connection extends Typegoose {
    @Field(type => ID)
    readonly _id: ObjectID;

    @prop({required: true})
    @Field()
    id: string;

    @prop({required: true})
    @Field()
    name: string;

    @prop({required: true})
    @Field()
    type: string;

    @prop()
    @Field()
    revoked: boolean;

    @prop({required: true})
    @Field()
    visibility: number;

}

@ObjectType()
class TimeTable extends Typegoose {
    @Field(type => ID)
    readonly _id: ObjectID;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Mo?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Tu?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    We?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Th?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Fr?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Sa?: Array<String>;

    @arrayProp({items: String}) 
    @Field(type => [String], { nullable: true })
    Su?: Array<String>;
}

@ObjectType()
export class User extends Typegoose {

    @Field(type => ID)
    readonly _id: ObjectID

    @prop({required: true})
    @Field()
    email: string;

    @prop({required: true})
    @Field()
    id: string;

    @prop({required: true})
    @Field()
    username: string;

    @prop()
    @Field({ nullable: true })
    avatar?: string;

    @prop()
    @Field({ nullable: true })
    avatarUrl?: string;

    @arrayProp({items: Connection})
    @Field(type => [Connection], { nullable: true })
    connections?: Array<Connection>;

    @arrayProp({itemsRef: {name: "Server"}})
    @Field(type => [Server], { nullable: true })
    servers?: Array<Ref<Server>>;

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
    @Field(type => TimeTable, { nullable: true })
    timeTable?: TimeTable;

    @arrayProp({itemsRef: {name: "Game"}})
    @Field(type => [Game])
    games: Array<Ref<Game>>;
}

export const UserModel = new User().getModelForClass(User, {
    schemaOptions: {
        collection: "users"
    }
});
