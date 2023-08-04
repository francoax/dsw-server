/* eslint-disable import/extensions */
import { Router } from 'express';

import carsRouter from './cars.routes.js';
import localitiesRouter from './locality.routes.js';

const router = Router();

// Imports for each route below
router.use('/cars', carsRouter);
router.use('/localities', localitiesRouter);

export default router;
