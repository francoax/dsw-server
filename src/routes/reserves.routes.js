import { Router } from 'express';
// eslint-disable-next-line import/extensions
import reserveController from '../controllers/reserve.js';

// eslint-disable-next-line import/extensions
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

router
  .get('/:id', [verifyMongoId], reserveController.get)
  .get('/', reserveController.getAll)
  .post('/', reserveController.post)
  .put('/:id', [verifyMongoId], reserveController.put)
  .delete('/:id', [verifyMongoId], reserveController.remove);

export default router;
