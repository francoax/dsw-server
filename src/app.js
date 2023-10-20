/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mainRouter from './routes/app.routes.js';

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: 'https://poncho-home-and-stay-git-dev-francoax.vercel.app',
  optionsSuccessStatus: 200,
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de mi proyecto',
      version: '1.0.0',
      description: 'Documentación de la API de mi proyecto',
    },
    servers: [
      {
        url: 'http://localhost:9000',
      },
    ],
  },
  apis: ['./routes/*.js'], // rutas de los archivos de las rutas
};

const specs = swaggerJsdoc(options);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
