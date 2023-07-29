/* eslint-disable import/extensions */
import { Router } from 'express';
import carRouter from '../controllers/carController.js';
import localityRouter from '../controllers/localityController.js';

const router = Router();

// Imports for each route below
router.use('/cars', carRouter);
router.use('/localities', localityRouter);

export default router;
