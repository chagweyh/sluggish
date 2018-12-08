import express from 'express';
const router = express.Router();
import { signup, getUser, getUsers } from '../controllers/userController';
import { signin, signout, isLoggedIn } from '../controllers/authController';
import { getChannels, getChannel, addChannel } from '../controllers/channelController';
import { getMessages, getMessage, addMessage } from '../controllers/messageController';

/**
 * Authentication Router
 **/
router.post('/signin', signin);
router.post('/signout', signout);

/**
 * Users Routes
 **/
// router.get('/users', isLoggedIn, getUsers);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/signup', signup);

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
