import { connect } from 'mongoose';
let connectionString = 'mongodb://localhost:27017/aa2gd';
if(process.env.MONGO_URL) {
  connectionString = process.env.MONGO_URL;
}

console.log("Conection string: ", connectionString);
connect(connectionString, {useNewUrlParser: true});