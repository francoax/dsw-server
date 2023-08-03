/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router
  .get('/', usersController.get)
  .post('/add', usersController.create)
  .put('/edit/:id', [verifyMongoId], usersController.edit)
  .delete('/remove/:id', [verifyMongoId], usersController.remove);

export default router;
