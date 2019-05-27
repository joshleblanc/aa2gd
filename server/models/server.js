const mongoose = require('mongoose');
const moment = require('moment');

const Server = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String },
    owner: { type: Boolean, required: true },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

Server.virtual('iconUrl').get(function() {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png`;
});

Server.virtual('pastEvents').get(function () {
    const today = moment();
    return this.events.filter(event => {
        const eventDate = moment(event.date);
        return eventDate.diff(today, 'hours') < -3;
    })
});

Server.virtual('futureEvents').get(function () {
    const today = moment();
    return this.events.filter(event => {
        const eventDate = moment(event.date);
        return eventDate.isAfter(today);
    })
});

Server.virtual('currentEvents').get(function () {
    const today = moment();
    return this.events.filter(event => {
        const eventDate = moment(event.date);
        const diff = eventDate.diff(today, 'hours');
        return diff > -3 && diff <= 0;
    });
});

module.exports = Server;
