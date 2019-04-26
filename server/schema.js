const {gql} = require("apollo-server");
const typeDefs = gql`
  type Query {
    hello: String,
    getDiscordToken(code: String!): String
  },
  type Mutation {
    login(email: String!, password: String!): String!
    register(email: String!, password: String!, confirmPassword: String!): Boolean!
  }
`;

module.exports = typeDefs;