/* eslint-disable import/extensions */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const { PORT } = process.env;

mongoose
  .connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: process.env.MONGO_POOLSIZE || 1 },
  )
  .then(() => console.log('Db connected'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((e) => console.log('Error: ', e));
