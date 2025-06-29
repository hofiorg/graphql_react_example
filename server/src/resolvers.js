const {PubSub} = require('graphql-subscriptions');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

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
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName()
    }
  });
}

setInterval(publishNewPerson, 5000);