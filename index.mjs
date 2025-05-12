import express from 'express';
import dotenv from 'dotenv';
import allRoutes from './src/routes/index.mjs';
import mongoose from 'mongoose';
import { requestLogger } from './src/commons/utils/requestLogger.mjs';

// configure .env
dotenv.config();

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) =>
    console.log('failed to connect to database', JSON.stringify(err))
  );

// initialize express
const app = express();
//middleware to parse json bodies
app.use(express.json());
app.use(requestLogger); // logs every request

// all routes
app.use(allRoutes);

//create a base route
app.get('/', (_, res) => {
  res.send('this is the base route for coinn pay app');
});

// listen to the the given port
app.listen(process.env.PORT, () => {
  console.log('express app running on port ' + process.env.PORT);
});
