const mongoose = require('mongoose');

const Webhook = mongoose.Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    server: { type: mongoose.Schema.Types.ObjectId, ref: "Server"}
});

module.exports = Webhook;