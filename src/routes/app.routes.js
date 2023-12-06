/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import { Router } from 'express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import carsRouter from './cars.routes.js';
import locationsRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';
import propertyTypeRouter from './propertieType.routes.js';
import packageRouter from './package.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

router.use('/property-types', propertyTypeRouter);
router.use('/medicalAssistances', medicalAssistanceRouter);
router.use('/properties', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/locations', locationsRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);
router.use('/images', express.static(path.join(__dirname, '../../public/images')));

export default router;
