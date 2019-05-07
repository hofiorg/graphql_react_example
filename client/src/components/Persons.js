import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_PERSONS = gql`
  {
    persons {
      id
      firstname
      lastname
    }
  }
`;

const Loading = () =>
  (<div>Loading ...</div>);

const Persons = () =>
  (<Query query={GET_PERSONS}>
    {({ data, loading }) => {
      const { persons } = data;

      if (loading || !persons) {
        return <Loading/>;
      }

      let personList = persons.map(person => {
        return (<li key={person.id}>{person.firstname} {person.lastname}</li>);
      });

      return (
        <div>
          {personList}
        </div>
      );
    }}
  </Query>);

export default Persons;