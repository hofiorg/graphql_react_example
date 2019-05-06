class PersonAPI {
  async getPersons() {

    let result = [{
      firstname: 'Jane',
      lastname: 'Doe'
    }, {
      firstname: 'John',
      lastname: 'Doe'
    }];

    return result;
  }
}

module.exports = PersonAPI;

