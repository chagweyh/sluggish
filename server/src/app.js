import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import Joi from 'joi';
import routes from './routes';

import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

export default app;
