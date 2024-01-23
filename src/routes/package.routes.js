/* eslint-disable import/extensions */
import { Router } from 'express';
import packageController from '../controllers/package.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router
  .get('/', packageController.listConcept)
  .get('/:id', [verifyMongoId], packageController.getPackage)
  .post('/', packageController.createPackage)
  .put('/:id', [verifyMongoId], packageController.updatePackage)
  .delete('/:id', [verifyMongoId], packageController.deletePackage);

export default router;
