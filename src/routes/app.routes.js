/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import carsRouter from './cars.routes.js';
import localitiesRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';

const router = Router();

router.use('/cars', carsRouter);
router.use('/localities', localitiesRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);

export default router;
