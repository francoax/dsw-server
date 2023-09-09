/* eslint-disable import/extensions */
import { Router } from 'express';
import localitiesController from '../controllers/localities.js';

const router = Router();

router
  .get('/', localitiesController.listLocalities)
  .get('/:id', localitiesController.listLocalityById)
  .post('/', localitiesController.createLocality)
  .put('/:id', localitiesController.updateLocality)
  .delete('/:id', localitiesController.deleteLocality);

export default router;
