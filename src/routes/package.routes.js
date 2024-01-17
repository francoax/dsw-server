/* eslint-disable import/extensions */
import { Router } from 'express';
import packageController from '../controllers/package.js';

const router = Router();

router
  .get('/', packageController.listConcept)
  .get('/:id', packageController.getPackage)
  .post('/', packageController.createPackage)
  .put('/:id', packageController.updatePackage)
  .delete('/:id', packageController.deletePackage);

export default router;
