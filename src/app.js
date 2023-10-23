/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import mainRouter from './routes/app.routes.js';

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: 'https://poncho-home-and-stay-git-dev-francoax.vercel.app',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
