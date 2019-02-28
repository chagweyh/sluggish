import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import mongoose from 'mongoose';
import socket from 'socket.io';
import routes from './routes';

Joi.objectId = JoiObjectId(Joi);

dotenv.config({ path: 'variables.env' });

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log(`server is running on ${server.address().port}`);
});

const io = socket(server);

io.on('connection', (client) => {
  console.log('made socket connection', client.id);

  // Handle message event
  client.on('send message', (message) => {
    io.sockets.emit('send message', message);
  });

  client.on('typing', (data) => {
    client.broadcast.emit('typing', data);
  });
});
