import express from 'express';
import propertyPriceController from '../controllers/propertyPriceController.js';

const router = express.Router();

router.get('/', propertyPriceController.getAll);
router.post('/', propertyPriceController.create);
router.put('/:id', propertyPriceController.editData);
router.delete('/:id', propertyPriceController.deleteData);
router.get('/:id', propertyPriceController.getOne);

export default router;
