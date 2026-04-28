require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3000;
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

const startApolloServer = async () => {
  try {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // ✅ Start server immediately
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });

    // ✅ Log DB connection (don’t block startup)
    db.once('open', () => {
      console.log('MongoDB connected');
    });

  } catch (err) {
    console.error('Failed to start Apollo Server', err);
    process.exit(1);
  }
};

// ✅ Call it OUTSIDE the function
startApolloServer();

// optional: graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await server.stop();
  process.exit(0);
});