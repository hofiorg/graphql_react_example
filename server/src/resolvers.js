module.exports = {
  Query: {
    persons: (_, { id }, { dataSources }) =>
      dataSources.personAPI.getPersons()
  }
};