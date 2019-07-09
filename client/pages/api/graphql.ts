import {config} from 'dotenv';
config();

import './mongoose';
const { ApolloServer } = require('apollo-server-micro');
import {buildSchema, buildSchemaSync} from 'type-graphql';
import { Container } from 'typedi';
import { EventResolver } from './resolvers/EventResolver';
import { TypegooseMiddleware } from './middleware/TypegooseMiddleware';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './scalars/ObjectIdScalar';
import { authChecker } from './lib/utils';
import { UserResolver } from './resolvers/UserResolver';
import { ServerResolver } from './resolvers/ServerResolver';
import { WebhookResolver } from './resolvers/WebhookResolver';
import { GameResolver } from './resolvers/GameResolver';

const context = async ({req}) => {
    let token = '';
    let host;
    if (process.env.NODE_ENV === 'development') {
        host = "http://localhost:3000"
    } else {
        host = req.headers.source
    }
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    return {
        token,
        origin: host
    }
};

const schema = buildSchemaSync({
    resolvers: [
        EventResolver,
        UserResolver,
        ServerResolver,
        WebhookResolver,
        GameResolver
    ],
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    container: Container,
    authChecker: authChecker,
    validate: false
});

export default new ApolloServer({
    schema,
    context,
    engine: {
        apiKey: process.env.ENGINE_API_KEY
    }
}).createHandler();
