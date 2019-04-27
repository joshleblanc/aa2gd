const {gql} = require("apollo-server");
const typeDefs = gql`
  type Query {
    hello: String,
    getDiscordToken(code: String!): String
    currentUser(token: String): User
  },
  type Mutation {
    login(email: String!, password: String!): String!
    register(email: String!, password: String!, confirmPassword: String!): Boolean!
  }
  type User {
    username: String!
    id: String!
    avatar: String
    avatarUrl: String
    email: String!
    connections: [Connection]
    servers: [Server]
  }
  type Connection {
    id: String!
    name: String!
    type: String!
    revoked: Boolean!
    visibility: Int!
  }
  type Server {
    id: String!
    name: String!
    icon: String
    iconUrl: String
    owner: Boolean!
  }
`;

module.exports = typeDefs;