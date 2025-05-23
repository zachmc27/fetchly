import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';


const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(graphqlUploadExpress());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

// --- Start of media GET route ---

  app.get('/media/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid media ID');
    }

    try {
      const bucket = new GridFSBucket(mongoose.connection.db!, {
        bucketName: 'media',
      });

      const downloadStream = bucket.openDownloadStream(new ObjectId(id));

      downloadStream.on('error', (err) => {
        if (err.message === 'FileNotFound') {
          return res.status(404).send('File not found');
        }
        console.error('Download stream error:', err);
        return res.status(500).send('Internal Server Error');
      });

      // Optional: Set content type headers if you want (query metadata for contentType if needed)

      downloadStream.pipe(res);
      return console.log('File streaming started');
    } catch (error) {
      console.error('Error in /media/:id route:', error);
      return res.status(500).send('Internal Server Error');
    }
  });
  // --- End of Media Get Route ---

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
