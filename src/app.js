/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import mainRouter from './routes/app.routes.js';
import { Resend } from 'resend';
import dotenv from 'dotenv'
import schedules from './schedules.js';

dotenv.config()

const app = express();
export const resend = new Resend(process.env.RESEND_API_KEY)
app.disable('x-powered-by');

schedules.scheduleTasks()


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
