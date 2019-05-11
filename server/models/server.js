const mongoose = require('mongoose');

const Server = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String },
    owner: { type: Boolean, required: true }
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

module.exports = Server;
