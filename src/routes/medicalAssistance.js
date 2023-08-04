import express from 'express';
const router = express.Router();
import MedicalAssistanceController from '../controllers/medicalAssistanceController.js';

router.get('/all',MedicalAssistanceController.getAll);

router.post('/add',MedicalAssistanceController.create);

router.put('/edit',MedicalAssistanceController.editData);

router.delete('/delete',MedicalAssistanceController.deleteData);

router.get('/:id',MedicalAssistanceController.getOne);

export default router;