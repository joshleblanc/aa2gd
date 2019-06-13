import {config} from 'dotenv';
config();

import './mongoose';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
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

async function boot() {
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
    
    const schema = await buildSchema({
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
    })
    
    const server = new ApolloServer({
        schema,
        context,
        engine: {
            apiKey: process.env.ENGINE_API_KEY
        }
    });
    
    server.listen().then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}

boot();