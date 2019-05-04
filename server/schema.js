const {gql} = require("apollo-server");
const typeDefs = gql`
    type Query {
        hello: String,
        getDiscordToken(code: String!): String
        currentUser(token: String): User
        server(id: ID!): Server
        user(id: ID!): User
    }
    type Mutation {
        login(email: String!, password: String!): String!
        register(email: String!, password: String!, confirmPassword: String!): Boolean!
        updateTimetable(time: String, day: String): User
    }
    type TimeTable {
        Mo: [String],
        Tu: [String],
        We: [String],
        Th: [String],
        Fr: [String],
        Sa: [String],
        Su: [String]
    }
    type User {
        _id: ID!
        username: String!
        id: String!
        avatar: String
        avatarUrl: String
        email: String!
        connections: [Connection]
        servers: [Server],
        timeTable: TimeTable
    }
    type Connection {
        _id: ID!
        id: String!
        name: String!
        type: String!
        revoked: Boolean!
        visibility: Int!
    }
    type Server {
        _id: ID!
        id: String!
        name: String!
        icon: String
        iconUrl: String
        owner: Boolean!
        users: [User]
    }
`;

module.exports = typeDefs;