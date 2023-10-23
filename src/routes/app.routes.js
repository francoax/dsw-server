/* eslint-disable import/order */
/* eslint-disable import/extensions */
import { Router } from 'express';

// Imports for each route below
import medicalAssistanceRouter from './medicalAssistance.routes.js';
import PropertyRouter from './property.routes.js';
import carsRouter from './cars.routes.js';
import localitiesRouter from './locality.routes.js';
import usersRouter from './users.routes.js';
import reserveRouter from './reserves.routes.js';
import propertieTypeRouter from './propertieType.routes.js';
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
    ],
  },
  apis: ['./src/routes/*.js'],
};

const router = Router();
const swaggerSpec = swaggerJSDoc(options);

router.use('/propertie-types', propertieTypeRouter);
router.use('/medicalAssistance', medicalAssistanceRouter);
router.use('/property', PropertyRouter);
router.use('/cars', carsRouter);
router.use('/localities', localitiesRouter);
router.use('/users', usersRouter);
router.use('/reserves', reserveRouter);
router.use('/packages', packageRouter);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
