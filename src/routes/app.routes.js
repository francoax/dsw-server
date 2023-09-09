/* eslint-disable import/extensions */
import { Router } from 'express';
// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import PropertyPriceRouter from './propertyPrice.routes.js';

const router = Router();

router.use('/medicalAssistance', medicalAssistanceRouter);
router.use('/Property', PropertyRouter);
router.use('/PropertyPrice', PropertyPriceRouter);
export default router;
