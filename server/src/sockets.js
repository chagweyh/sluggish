import socketio from 'socket.io';
import logger from './helpers/logger';

const sockets = {};

sockets.init = (server) => {
  const io = socketio.listen(server);

  io.on('connection', (client) => {
    logger.info('made socket connection', client.id);

    client.on('send message', (message) => {
      io.sockets.emit('send message', message);
    });

    client.on('typing', (data) => {
      client.broadcast.emit('typing', data);
    });
  });
};

export default sockets;
