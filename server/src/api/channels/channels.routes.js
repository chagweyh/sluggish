import express from 'express';
import {
  addChannel,
  getChannels,
  getChannel,
  starChannel,
  deleteChannel,
  addMessage,
} from './channels.controller';
import validateChannel from './channel.validator';
import isAuthenticated from '../auth/auth.middleware';
import { validate, validateObjectId } from '../../middlewares';
import validateMessage from '../messages/message.validator';

const router = express.Router();

router.get('/', getChannels);
router.get('/:slug', getChannel);
router.post('/', [isAuthenticated, validate(validateChannel)], addChannel);
router.post('/:id/star', isAuthenticated, starChannel);
router.post(
  '/:id/messages',
  [isAuthenticated, validateObjectId, validate(validateMessage)],
  addMessage,
);
router.delete('/:slug', isAuthenticated, deleteChannel);

export default router;
