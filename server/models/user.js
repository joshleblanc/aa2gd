const mongoose = require('mongoose');

const Connection = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    revoked: {type: Boolean, required: false},
    visibility: {type: Number, required: true}
});

const TimeTable = mongoose.Schema({
    Mo: {type: Array, default: []},
    Tu: {type: Array, default: []},
    We: {type: Array, default: []},
    Th: {type: Array, default: []},
    Fr: {type: Array, default: []},
    Sa: {type: Array, default: []},
    Su: {type: Array, default: []},
});

const User = mongoose.Schema({
    email: {type: String, required: true},
    id: {type: String, required: true},
    username: {type: String, required: true},
    avatar: {type: String},
    avatarUrl: {type: String},
    connections: [Connection],
    servers: [{type: mongoose.Schema.Types.ObjectId, ref: "Server"}],
    timeTable: {
        type: TimeTable, default: {
            Mo: [],
            Tu: [],
            We: [],
            Th: [],
            Fr: [],
            Sa: [],
            Su: []
        },
    },
    games: [{type: mongoose.Schema.Types.ObjectId, ref: "Game"}]
});

module.exports = User;