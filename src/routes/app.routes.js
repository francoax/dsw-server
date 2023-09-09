/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';

const router = Router();

router
  .use('/users', usersRouter)
  .use('/reserves', reserveRouter);

export default router;
