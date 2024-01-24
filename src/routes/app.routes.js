/* eslint-disable import/order */
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

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API web de Poncho H&S',
    },
    tags: [
      {
        name: 'Users',
        description: 'Documentation about user endpoints',
      },
      {
        name: 'Packages',
        description: 'Documentation about package endpoints.',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const router = Router();
const swaggerSpec = swaggerJSDoc(options);

router.use('/property-types', propertyTypeRouter);
router.use('/medicalAssistances', medicalAssistanceRouter);
router.use('/properties', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/locations', locationsRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
