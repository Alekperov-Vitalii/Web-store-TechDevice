const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('@apollo/server');
const cors = require('cors');

const app = express();
app.use(cors());

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });

  mongoose.connect('mongodb://localhost:27017/my-webstore', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      app.listen(4000, () => {
        console.log('Server running on http://localhost:4000');
      });
    })
    .catch(err => console.error(err));
});
