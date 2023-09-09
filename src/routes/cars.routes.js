/* eslint-disable import/extensions */
import { Router } from 'express';
import carsController from '../controllers/cars.js';

const router = Router();

router
  .get('/', carsController.listCars)
  .get('/:id', carsController.listCarById)
  .post('/', carsController.createCar)
  .put('/:id', carsController.updateCar)
  .delete('/:id', carsController.deleteCar);

export default router;
