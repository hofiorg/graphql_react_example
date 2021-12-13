const { v4: uuidv4 } = require('uuid');

class PersonAPI {
  async getPersons() {
    return [{
      id: `${uuidv4()}`,
      firstname: 'Jane',
      lastname: 'Doe'
    }, {
      id: `${uuidv4()}`,
      firstname: 'John',
      lastname: 'Doe'
    }];
  }
}

module.exports = PersonAPI;

