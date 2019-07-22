import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import Joi from '@hapi/joi';
import path from 'path';
import JoiObjectId from 'joi-objectid';
import morgan from 'morgan';
import routes from './routes';
import logger from './helpers/logger';
import connectToDb from './helpers/databaseConnection';
import { notFound, errorHandler } from './middlewares';

connectToDb();

Joi.objectId = JoiObjectId(Joi);

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(notFound);
app.use(errorHandler);

export default app;
