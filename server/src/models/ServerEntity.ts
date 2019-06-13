import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import { EventEntity } from './EventEntity';
import * as moment from 'moment';


export class ServerEntity extends Typegoose {

    @prop({ required: true })
    id: string;

    @prop({ required: true })
    name: string;

    @prop()
    icon: string;

    @prop({ required: true })
    owner: boolean;

    @arrayProp({ itemsRef: { name: "EventEntity" } })
    events: Array<Ref<EventEntity>>;

    @prop()
    get iconUrl() {
        return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
    }

    @prop()
    get pastEvents() {
        const today = moment();
        return this.events.filter((event:EventEntity) => {
            const eventDate = moment(event.date);
            return eventDate.diff(today, 'hours') < -3;
        })
    }

    @prop()
    get futureEvents() {
        const today = moment();
        console.log(this.name, this.events);
        return this.events.filter((event:EventEntity) => {
            const eventDate = moment(event.date);
            return eventDate.isAfter(today);
        })
    }

    @prop()
    get currentEvents() {
        const today = moment();
        return this.events.filter((event:EventEntity) => {
            const eventDate = moment(event.date);
            const diff = eventDate.diff(today, 'hours');
            return diff > -3 && diff <= 0;
        });
    }
}

export const Server = new ServerEntity().getModelForClass(ServerEntity, {
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
