import { Router } from 'express';
import propertieTypeRouter from './propertieType.routes.js';

const router = Router();

// Imports for each route below
router.use('/propertie-types', propertieTypeRouter);

export default router;
