import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);
mongoose.connection.on('error', err => {
  console.error(err.message);
});

import app from './app';
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log(`server is running on ${server.address().port}`);
});
