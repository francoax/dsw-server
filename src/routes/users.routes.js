/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

const router = Router();

router
  .get('/', usersController.get)
  .post('/add', usersController.create)
  .put('/edit/:id', usersController.edit)
  .delete('/remove/:id', usersController.remove);

export default router;
