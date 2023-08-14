/* eslint-disable import/extensions */
import express from 'express';
import MedicalAssistanceController from '../controllers/medicalAssistanceController.js';

const router = express.Router();

router.get('/', MedicalAssistanceController.getAll);

router.post('/', MedicalAssistanceController.create);

router.put('/:id', MedicalAssistanceController.editData);

router.delete('/:id', MedicalAssistanceController.deleteData);

router.get('/:id', MedicalAssistanceController.getOne);

export default router;
