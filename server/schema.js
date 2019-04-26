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
    verified: Boolean!
    locale: String!
    premium_type: Int!
    mfa_enabled: Boolean!
    id: String!
    flags: Int!
    avatar: String!
    discriminator: String!
    email: String!
  }
`;

module.exports = typeDefs;