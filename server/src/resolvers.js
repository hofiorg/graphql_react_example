const {PubSub} = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');

const pubsub = new PubSub();

const PERSON_ADDED = 'PERSON_ADDED';

module.exports = {
  Query: {
    persons: (_, {id}, {dataSources}) =>
      dataSources.personAPI.getPersons()
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator([PERSON_ADDED]),
    },
  },
};

function publishNewPerson() {
  let uuid = uuidv4();
  console.log(`publish new person ${uuid}`);

  pubsub.publish(PERSON_ADDED, {
    personAdded: {
      id: `${uuid}`,
      firstname: faker.fake("{{name.firstName}}"),
      lastname: faker.fake("{{name.lastName}}")
    }
  });
}

setInterval(publishNewPerson, 5000);