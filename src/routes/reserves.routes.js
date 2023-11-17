/* eslint-disable import/extensions */
import { Router } from 'express';
import reserveController from '../controllers/reserve.js';
import verifyMongoId from '../middlewares/mongoIdField.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

router
  .get('/', reserveController.getAll)
  .get('/user', [authenticateToken], reserveController.getByUser)
  .get('/:id', [verifyMongoId], reserveController.get)
  .post('/', [authenticateToken], reserveController.post)
  .put('/:id', [verifyMongoId, authenticateToken], reserveController.put)
  .delete('/:id', [verifyMongoId, authenticateToken], reserveController.remove);

export default router;
