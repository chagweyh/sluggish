import express from 'express';
const router = express.Router();
import { getUsers, getUser, addUser } from '../controllers/userController';
import { getChannels, getChannel, addChannel } from '../controllers/channelController';
import { getMessages, getMessage, addMessage } from '../controllers/messageController';

/**
 * Users Routes
 **/
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/user', addUser);

/**
 * Channels Routes
 **/
router.get('/channels', getChannels);
router.get('/channels/:id', getChannel);
router.post('/channel', addChannel);
/**


/**
 * Messages Routes
 **/
router.get('/messages', getMessages);
router.get('/messages/:id', getMessage);
router.post('/messages', addMessage);

export default router;
