/* eslint-disable import/extensions */
import express from 'express';
import MedicalAssistanceController from '../controllers/medicalAssistanceController.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { ROLE_USER, ROLE_ADMIN } from '../utils/constants.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = express.Router();

router.get('/', [authenticateToken, authenticateRole([ROLE_USER, ROLE_ADMIN])], MedicalAssistanceController.getAll);

router.post('/', [authenticateToken, authenticateRole([ROLE_ADMIN])], MedicalAssistanceController.create);

router.put('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], MedicalAssistanceController.editData);

router.delete('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], MedicalAssistanceController.deleteData);

router.get('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], MedicalAssistanceController.getOne);

export default router;
