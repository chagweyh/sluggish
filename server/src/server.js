import mongoose from 'mongoose';
import socket from 'socket.io';
import config from 'config';
import logger from './utils/logging';
import app from './app';

mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('db'), { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  logger.error(err.message);
});

app.set('port', config.get('port') || 8080);

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

export default server;
