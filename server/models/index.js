const mongoose = require("mongoose");
const Game = require('./game');
const Server = require('./server');
const User = require('./user');
const Event = require('./event');
const Webhook = require('./webhook');

mongoose.model('Game', Game);
mongoose.model('Server', Server);
mongoose.model('User', User);
mongoose.model('Event', Event);
mongoose.model('Webhook', Webhook);