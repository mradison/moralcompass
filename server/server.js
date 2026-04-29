require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// ✅ FIXED PORT (must be 3001 for Vite proxy)
const PORT = process.env.PORT || 3001;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await server.start();

    // ✅ Middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // ✅ GraphQL endpoint
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );

    // ✅ Serve client in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // ✅ Wait for DB before starting server (more reliable)
    db.once('open', () => {
      console.log('MongoDB connected');

      app.listen(PORT, () => {
        console.log(`🚀 API server running on port ${PORT}!`);
        console.log(`📡 GraphQL ready at http://localhost:${PORT}/graphql`);
      });
    });

  } catch (err) {
    console.error('❌ Failed to start Apollo Server', err);
    process.exit(1);
  }
};

// ✅ Start server
startApolloServer();

// ✅ Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await server.stop();
  process.exit(0);
});