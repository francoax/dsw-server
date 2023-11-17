import { Router } from 'express';
import propertieTypeABM from '../controllers/propertieTypeController.js';


const router = Router();

router.get('/', propertieTypeABM.getAll);

router.get('/:id', propertieTypeABM.getOne);

router.post('/', propertieTypeABM.add);

router.put('/:id', propertieTypeABM.update);

router.delete('/:id', propertieTypeABM.delete);

export default router;