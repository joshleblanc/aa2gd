const mongoose = require('mongoose');

const ServerSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String },
    iconUrl: { type: String },
    owner: { type: Boolean, required: true }
});

module.exports = {
    ServerSchema,
    Server: mongoose.model('Server', ServerSchema)
};
