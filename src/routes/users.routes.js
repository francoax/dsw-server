/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router
  .get('/:id', [verifyMongoId], usersController.get)
  .get('/', usersController.getAll)
  .post('/', usersController.create)
  .put('/:id', [verifyMongoId], usersController.edit)
  .delete('/:id', [verifyMongoId], usersController.remove);

export default router;
