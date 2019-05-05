const mongoose = require('mongoose');
const { ServerSchema } = require('./server');
const { GameSchema } = require('./game');

const ConnectionSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  revoked: { type: Boolean, required: false },
  visibility: { type: Number, required: true }
});

const TimeTableSchema = mongoose.Schema({
  Mo: { type: Array, default: []},
  Tu: { type: Array, default: []},
  We: { type: Array, default: []},
  Th: { type: Array, default: []},
  Fr: { type: Array, default: []},
  Sa: { type: Array, default: []},
  Su: { type: Array, default: []},
});

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String },
  avatarUrl: { type: String },
  connections: [ConnectionSchema],
  servers: [ServerSchema],
  timeTable: TimeTableSchema,
  games: [GameSchema]
});

module.exports = mongoose.model('User', UserSchema);