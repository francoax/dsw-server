/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import verifyMongoId from '../middlewares/mongoIdField.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

router
  .get('/:id', [verifyMongoId, authenticateToken], usersController.get)
  .get('/', usersController.getAll)
  .post('/login', usersController.login)
  .post('/', usersController.create)
  .put('/', [authenticateToken], usersController.edit)
  .delete('/', [authenticateToken], usersController.remove);

export default router;
