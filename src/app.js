/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mainRouter from './routes/app.routes.js';

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: 'https://poncho-home-and-stay-git-dev-francoax.vercel.app',
  optionsSuccessStatus: 200,
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'PHS API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/users.routes.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', mainRouter);

export default app;
