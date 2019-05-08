import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
