/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import carsRouter from './cars.routes.js';
import locationsRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';
import propertyTypeRouter from './propertieType.routes.js';
import packageRouter from './package.routes.js';
// import { resend } from '../app.js';

const router = Router();

router.use('/property-types', propertyTypeRouter);
router.use('/medicalAssistances', medicalAssistanceRouter);
router.use('/properties', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/locations', locationsRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);
// router.use('/test-email', async (req, res) => {
//   try {
//     const data = await resend.emails.send({
//       from: 'PonchoH&S <messsages-ponchohomeandstay@phs-noreply.com>',
//       to: ['francoa.duarte2001@gmail.com'],
//       subject: 'testing',
//       html: '<strong> testing </strong>',
//     });
//     res.status(200).json({ data });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });

export default router;
