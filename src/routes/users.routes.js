/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

router
  .get('/me', [authenticateToken], usersController.get)
  .get('/', usersController.getAll)
  .post('/login', usersController.login)
  .post('/', usersController.create)
  .put('/', [authenticateToken], usersController.edit)
  .put('/:id', usersController.edit)
  .delete('/', [authenticateToken], usersController.remove);

export default router;
