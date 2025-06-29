import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloClient} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react/context';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {HttpLink} from '@apollo/client/link/http';
import {split} from '@apollo/client/link/core';
import {getMainDefinition} from '@apollo/client/utilities';
import {InMemoryCache} from '@apollo/client';
import {createClient} from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const wsClient = createClient({
  url: 'ws://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(wsClient);

const link = split(
  // split based on operation type
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
