require('dotenv').config()
const {ApolloServer} = require("apollo-server");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('./mongoose');

const context = async ({ req }) => {
  let token = '';
  let host;
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV === 'development') {
    host = "http://localhost:3000"
  } else {
    host = req.headers.origin
  }
  console.log(req.headers)
  if(req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }
  return {
    token,
    origin: host
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});