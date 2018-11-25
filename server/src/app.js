import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config({ path: 'variables.env' });

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log(`server is running on ${server.address().port}`);
});
