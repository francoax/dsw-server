/* eslint-disable import/extensions */
import { Router } from 'express';
import carRouter from '../controllers/carController.js';

const router = Router();

// Imports for each route below
router.use('/cars', carRouter);

export default router;
