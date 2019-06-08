const mongoose = require('mongoose');

const Event = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    server: {type: mongoose.Schema.Types.ObjectId, ref: "Server"},
    game: {type: mongoose.Schema.Types.ObjectId, ref: "Game"}
});



module.exports = Event;