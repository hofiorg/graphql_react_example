class PersonAPI {
  async getPersons() {
    return [{
      firstname: 'Jane',
      lastname: 'Doe'
    }, {
      firstname: 'John',
      lastname: 'Doe'
    }];
  }
}

module.exports = PersonAPI;

