/* eslint-disable import/extensions */
import { Router } from 'express';
import locationsController from '../controllers/locations.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import { ROLE_ADMIN } from '../utils/constants.js';

const router = Router();

router.get('/countries', [authenticateToken, authenticateRole([ROLE_ADMIN])], locationsController.getCountries);
router.get('/states/:ccode', [authenticateToken, authenticateRole([ROLE_ADMIN])], locationsController.getStates);
router.get('/cities/:ccode&:rcode', [authenticateToken, authenticateRole([ROLE_ADMIN])], locationsController.getCities);

export default router;
