import React from 'react';
import {gql} from 'graphql-tag';
import {withApollo} from '@apollo/client/react/hoc';
import {isEmpty} from 'lodash'

const GET_PERSONS = gql`
  {
    persons {
      id
      firstname
      lastname
    }
  }
`;

const PERSONS_SUBSCRIPTION = gql`
  subscription personAdded {
    personAdded {
      id
      firstname
      lastname
    }
  }
`;

class Persons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {persons: []};
  }

  componentDidMount() {
    this.props.client
      .query({query: GET_PERSONS})
      .then(({data: {persons}}) => {
        this.setState({persons});
      });

    this.props.client
      .subscribe({query: PERSONS_SUBSCRIPTION})
      .subscribe(({data: {personAdded}}) => {
        this.setState((state) => {
          return {
              persons: [
                ...state.persons,
                personAdded
              ]
          };
        });
      });
  }

  render() {
    if (isEmpty(this.state.persons))
      return <div>Loading ...</div>;

    let personList = this.state.persons.map(person =>
      <li key={person.id}>{person.firstname} {person.lastname}</li>
    );

    return <div>{personList}</div>;
  }
}

export default withApollo(Persons);