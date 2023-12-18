/* eslint-disable import/extensions */
import express from 'express';
// eslint-disable-next-line import/extensions
import PropertiesController from '../controllers/PropertiesController.js';
import uploadFile from '../middlewares/imageUpload.js';

const router = express.Router();

router.get('/', PropertiesController.getAll);
router.post('/', uploadFile, PropertiesController.create);
router.put('/:id', PropertiesController.editData);
router.delete('/:id', PropertiesController.deleteData);
router.get('/:id', PropertiesController.getOne);
router.get('/:id/image', PropertiesController.getImage);

export default router;
