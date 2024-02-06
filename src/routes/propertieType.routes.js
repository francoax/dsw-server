/* eslint-disable import/extensions */
import { Router } from 'express';
import propertieTypeABM from '../controllers/propertieTypeController.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { ROLE_ADMIN } from '../utils/constants.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router.get('/', [authenticateToken, authenticateRole([ROLE_ADMIN])], propertieTypeABM.getAll);

router.get('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], propertieTypeABM.getOne);

router.post('/', [authenticateToken, authenticateRole([ROLE_ADMIN])], propertieTypeABM.add);

router.put('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], propertieTypeABM.update);

router.delete('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], propertieTypeABM.delete);

export default router;
