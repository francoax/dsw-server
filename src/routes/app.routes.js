import express from 'express';
import { Router } from 'express';
const router = express.Router();

// Imports for each route below
import medicalAssistanceRouter from '../routes/medicalAssistance.js';
router.use('/medicalAssistance',medicalAssistanceRouter);


export default router;
