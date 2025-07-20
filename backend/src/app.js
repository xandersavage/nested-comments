import express from 'express';
import 'dotenv/config';
import cors from 'cors';

// Import the route files
import postRoutes from './routes/postRoute.js';
import commentRoutes from './routes/commentRoute.js';
import documentRoutes from './routes/documentRoute.js';

// Connect to database
import { connectDB } from './config/db.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
})();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/documents', documentRoutes);

export default app;
