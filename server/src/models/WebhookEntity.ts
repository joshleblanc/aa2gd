import {prop, Ref, Typegoose} from "typegoose";
import {UserEntity} from "./UserEntity";
import {ServerEntity} from "./ServerEntity";

export class WebhookEntity extends Typegoose {
    @prop({required: true})
    url: string;

    @prop({required: true})
    name: string;

    @prop({ref: UserEntity})
    creator: Ref<UserEntity>;

    @prop({ ref: ServerEntity })
    server: Ref<ServerEntity>;
}

export const Webhook = new WebhookEntity().getModelForClass(WebhookEntity);
