const {gql} = require("apollo-server");
const typeDefs = gql`
    type Query {
        hello: String,
        getDiscordToken(code: String!): String
        currentUser(token: String): User
        server(id: ID!): Server
        user(id: ID!): User
        events: [Event]!
        availableUsers(serverId: ID!, gameId: ID!, date: String!): String!
        availableTimeTable(id: ID!): String
    }
    type Mutation {
        login(email: String!, password: String!): String!
        register(email: String!, password: String!, confirmPassword: String!): Boolean!
        updateTimetable(time: String, day: String): User
        createEvent(name: String!, server: ID!, game: ID!, date: String!): Event!
    }
    type Event {
        _id: ID!
        name: String!
        date: String!
        server: Server!
        game: Game!
    }
    type Game {
        _id: ID!
        appid: Int!
        name: String!
        playtime_forever: Int!
        iconUrl: String!
        logoUrl: String!
        events: [Event]
    }
    type TimeTable {
        _id: ID!,
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
        timeTable: TimeTable,
        games: [Game]!
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
        events: [Event]
        currentEvents: [Event]
        pastEvents: [Event]
        futureEvents: [Event]
    }
`;

module.exports = typeDefs;