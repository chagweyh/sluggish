import mongoose from 'mongoose';
import dotenv from 'dotenv';
import socket from 'socket.io';
import logger from './utils/logging';
import app from './app';

// dotenv.config({ path: 'variables.env' });
dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  logger.error(err.message);
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  logger.info(`server is running on ${server.address().port}`);
});

const io = socket(server);

io.on('connection', (client) => {
  logger.info('made socket connection', client.id);

  client.on('send message', (message) => {
    io.sockets.emit('send message', message);
  });

  client.on('typing', (data) => {
    client.broadcast.emit('typing', data);
  });
});
