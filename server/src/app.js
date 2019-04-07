import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import Joi from 'joi';
import path from 'path';
import JoiObjectId from 'joi-objectid';
import morgan from 'morgan';
import routes from './routes';
import logger from './utils/logging';
import catchErrors from './handlers/errorHandler';

Joi.objectId = JoiObjectId(Joi);

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: logger.stream }));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(catchErrors);

export default app;
