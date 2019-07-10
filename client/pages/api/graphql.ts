console.log("wefnwef");
import '../../mongoose';
import {ApolloServer} from 'apollo-server-micro';
import {buildSchemaSync} from 'type-graphql';
import {Container} from 'typedi';
import {EventResolver} from '../../resolvers/EventResolver';
import {TypegooseMiddleware} from '../../middleware/TypegooseMiddleware';
import {ObjectId} from 'mongodb';
import {ObjectIdScalar} from '../../scalars/ObjectIdScalar';
import {authChecker} from '../../lib/utils';
// import {UserResolver} from '../../resolvers/UserResolver';
import {ServerResolver} from '../../resolvers/ServerResolver';
// import {WebhookResolver} from '../../resolvers/WebhookResolver';
import {GameResolver} from '../../resolvers/GameResolver';

console.log("wiepfjwef");

const context = async ({req}) => {
    console.log("owenfwefwf");
    let token = '';
    let host;
    console.log("Test");
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
        // UserResolver,
        ServerResolver,
        // WebhookResolver,
        GameResolver
    ],
    authChecker,
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{type: ObjectId, scalar: ObjectIdScalar}],
    container: Container,
});

console.log(schema);

export const config = {
    api: {
        bodyParser: false
    }
};

export default new ApolloServer({
    schema,
    context,
    engine: {
        apiKey: process.env.ENGINE_API_KEY
    }
}).createHandler({ path: "/api/graphql" });
