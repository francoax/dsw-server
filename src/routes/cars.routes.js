/* eslint-disable import/extensions */
import { Router } from 'express';
import carsController from '../controllers/cars.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import { ROLE_ADMIN, ROLE_USER } from '../utils/constants.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router
  .get('/', [authenticateToken, authenticateRole([ROLE_ADMIN, ROLE_USER])], carsController.listCars)
  .get('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], carsController.listCarById)
  .post('/', [authenticateToken, authenticateRole([ROLE_ADMIN])], carsController.createCar)
  .put('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], carsController.updateCar)
  .delete('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], carsController.deleteCar);

export default router;
