/* eslint-disable import/extensions */
import { Router } from 'express';
import locationsController from '../controllers/locations.js';

const router = Router();

router.get('/countries', locationsController.getCountries);
router.get('/states/:ccode', locationsController.getStates);
router.get('/cities/:ccode&:rcode', locationsController.getCities);

export default router;
