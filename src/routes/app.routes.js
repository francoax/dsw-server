import { Router } from 'express';

// Imports for each route below
import usersRouter from './users.routes';
import reserveRouter from './reserves.routes';

const router = Router();

router
  .use('/users', usersRouter)
  .use('/reserves', reserveRouter);

export default router;
