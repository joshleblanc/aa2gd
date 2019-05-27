const mongoose = require("mongoose");
const Game = require('./game');
const Server = require('./server');
const User = require('./user');
const Event = require('./event');

mongoose.model('Game', Game);
mongoose.model('Server', Server);
mongoose.model('User', User);
mongoose.model('Event', Event);