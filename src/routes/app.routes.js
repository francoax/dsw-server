/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import carsRouter from './cars.routes.js';
import localitiesRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';
import propertieTypeRouter from './propertieType.routes.js';
import packageRouter from './package.routes.js';

const router = Router();

router.use('/propertie-types', propertieTypeRouter);
router.use('/medicalAssistance', medicalAssistanceRouter);
router.use('/property', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/localities', localitiesRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);

export default router;
