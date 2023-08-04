/* eslint-disable import/extensions */
import { Router } from 'express';
// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';

const router = Router();

router.use('/medicalAssistance', medicalAssistanceRouter);

export default router;
