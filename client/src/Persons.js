import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import uuidv1 from  'uuid/v1';

const GET_PERSONS = gql`
  {
    persons {
      firstname
      lastname
    }
  }
`;

const Loading = () =>
  <div>Loading ...</div>

const Persons = () => (
  <Query query={GET_PERSONS}>
    {({ data, loading }) => {
      const { persons } = data;

      if (loading || !persons) {
        return <Loading/>;
      }

      return (
        <div>
          {mapPersons(persons)}
        </div>
      );
    }}
  </Query>
);

const mapPersons = (persons) => {
  return persons.map(person => {
    return (<li key={uuidv1()}>{person.firstname} {person.lastname}</li>);
  });
};

export default Persons;