import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

export default async function connectToDb() {
  const db = config.get('db');

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
  } catch (error) {
    logger.error(error.message);
  }
}
