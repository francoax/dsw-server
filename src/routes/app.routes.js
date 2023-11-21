/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import carsRouter from './cars.routes.js';
import locationsRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';
import propertyTypeRouter from './propertieType.routes.js';
import packageRouter from './package.routes.js';

const router = Router();

router.use('/property-types', propertyTypeRouter);
router.use('/medicalAssistance', medicalAssistanceRouter);
router.use('/property', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/locations', locationsRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);

export default router;
