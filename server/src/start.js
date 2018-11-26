import mongoose from 'mongoose';
import dotenv from 'dotenv';
import socket from 'socket.io';
import './models/Channel';
import './models/Message';
import './models/User';
import app from './app';

dotenv.config({ path: 'variables.env' });

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log(`server is running on ${server.address().port}`);
});

const io = socket(server);
io.on('connection', socket => {
  console.log('made socket connection', socket.id);
});
