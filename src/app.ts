import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRoutes from './routes/book.routes';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/config/.env' });
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/books-app');

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Middleware
app.use(bodyParser.json());
app.use('/api', bookRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
