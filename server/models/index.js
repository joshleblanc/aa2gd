const mongoose = require("mongoose");
const Game = require('./game');
const Server = require('./server');
const User = require('./user');

mongoose.model('Game', Game);
mongoose.model('Server', Server);
mongoose.model('User', User);

console.log("Loaded");