const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PersonAPI = require('./datasources/person');

async function startApolloServer() {
  const app = express();
  const httpServer = createServer(app);

  // Create executable schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Enable CORS
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev server (both CRA and Vite)
    credentials: true
  }));

  // Handle preflight requests
  app.options('*', cors());

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer(
    {
      schema: schema,
      context: () => ({
        dataSources: {
          personAPI: new PersonAPI()
        }
      })
    },
    wsServer
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      personAPI: new PersonAPI()
    }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();