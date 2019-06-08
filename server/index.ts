require('dotenv').config();
require('./src/mongoose');
const {ApolloServer} = require("apollo-server");
const typeDefs = require('./src/apollo/schema');
const resolvers = require('./src/apollo/resolvers');

const context = async ({req}) => {
    let token = '';
    let host;
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        host = "http://localhost:3000"
    } else {
        host = req.headers.source
    }
    console.log(req.headers)
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    return {
        token,
        origin: host
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    engine: {
        apiKey: process.env.ENGINE_API_KEY
    }
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});