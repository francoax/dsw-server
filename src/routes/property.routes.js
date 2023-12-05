import express from 'express';
// eslint-disable-next-line import/extensions
import PropertiesController from '../controllers/PropertiesController.js';

const router = express.Router();

router.get('/', PropertiesController.getAll);
router.post('/', PropertiesController.upload.single('image'), PropertiesController.create);
router.put('/:id', PropertiesController.editData);
router.delete('/:id', PropertiesController.deleteData);
router.get('/:id', PropertiesController.getOne);

export default router;
