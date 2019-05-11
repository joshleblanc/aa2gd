const mongoose = require('mongoose');
const {GameSchema} = require("./game");
const {ServerSchema} = require("./server");

const EventSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    server: ServerSchema,
    game: GameSchema
});

const Event = mongoose.model("Event", EventSchema);

module.exports = {
    EventSchema,
    Event
};