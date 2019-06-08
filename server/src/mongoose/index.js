const mongoose = require('mongoose');
require('../models');

let connectionString = 'mongodb://localhost:27017/aa2gd';
if(process.env.MONGO_URL) {
  connectionString = process.env.MONGO_URL;
}

console.log("Conection string: ", connectionString);
mongoose.connect(connectionString, {useNewUrlParser: true});