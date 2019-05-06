const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    persons: [Person]
  }

  type Person {
    firstname: String
    lastname: String
  }
`;
module.exports = typeDefs;