/* eslint-disable import/extensions */
import express from 'express';
import MedicalAssistanceController from '../controllers/medicalAssistanceController.js';

const router = express.Router();

router.get('/all', MedicalAssistanceController.getAll);

router.post('/add', MedicalAssistanceController.create);

router.put('/edit', MedicalAssistanceController.editData);

router.delete('/delete', MedicalAssistanceController.deleteData);

router.get('/:id', MedicalAssistanceController.getOne);

export default router;
