/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/app.routes.js';
import schedules from './schedules.js';

dotenv.config();

const app = express();
app.disable('x-powered-by');

schedules.scheduleTasks();

if (process.env.NODE_ENV === 'development') {
  app.use(cors(process.env.CORS_DEV));
} else {
  app.use(cors(process.env.CORS_PROD));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
