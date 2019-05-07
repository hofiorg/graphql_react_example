import React from 'react';
import { gql } from 'apollo-boost';
import { Subscription } from 'react-apollo';

const PERSONS_SUBSCRIPTION = gql`
  subscription personAdded {
    personAdded {
      id
      firstname
      lastname
    }
  }
`;

let persons = [];

const PersonsSubscription = () =>
  (<Subscription subscription={PERSONS_SUBSCRIPTION}>
    {({ data, loading }) => {

      console.log('data', data);

      if(!data)
        return null;

      const { personAdded } = data;

      if (loading || !personAdded) {
        return null;
      }

      persons.push(personAdded);

      console.log(persons);

      let personList = persons.map(person => {
        return (<li key={person.id}>{person.firstname} {person.lastname}</li>);
      });

      return (
        <div>
          {personList}
        </div>
      );
    }}
  </Subscription>);

export default PersonsSubscription;