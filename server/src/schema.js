const {gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
    persons: [Person]
  }

  type Subscription {
    personAdded: Person
  }

  type Person {
    id: String
    firstname: String
    lastname: String
  }
`;
module.exports = typeDefs;