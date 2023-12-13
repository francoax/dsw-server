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

// const corsOptions = {
//   origin: 'https://poncho-home-and-stay-git-dev-francoax.vercel.app',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
