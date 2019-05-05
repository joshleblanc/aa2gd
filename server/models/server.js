const mongoose = require('mongoose');

const ServerSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String },
    iconUrl: { type: String },
    owner: { type: Boolean, required: true }
});

const Server = mongoose.model("Server", ServerSchema);

module.exports = {
    ServerSchema,
    Server
};
