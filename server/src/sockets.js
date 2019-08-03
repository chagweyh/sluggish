import socketio from 'socket.io';
import logger from './helpers/logger';

const sockets = {};

sockets.init = (server) => {
  const io = socketio.listen(server);

  io.on('connection', (socket) => {
    logger.info('made socket connection', socket.id);

    socket.on('send message', (message) => {
      io.emit('send message', message);
    });

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
    });
  });
};

export default sockets;
