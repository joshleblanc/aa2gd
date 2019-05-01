const mongoose = require('mongoose');
const { ServerSchema } = require('./server');

const ConnectionSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  revoked: { type: Boolean, required: true },
  visibility: { type: Number, required: true }
});

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String },
  avatarUrl: { type: String },
  connections: [ConnectionSchema],
  servers: [ServerSchema]
});

module.exports = mongoose.model('User', UserSchema);