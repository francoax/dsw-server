import { Router } from 'express';
import reserveController from '../controllers/reserve';

import verifyMongoId from '../middlewares/mongoIdField';

const router = Router();

router
  .get('/:id', [verifyMongoId], reserveController.get)
  .get('/', reserveController.getAll)
  .post('/', reserveController.post)
  .put('/:id', [verifyMongoId], reserveController.put)
  .delete('/:id', [verifyMongoId], reserveController.remove);

export default router;
