/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import mainRouter from './routes/app.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
