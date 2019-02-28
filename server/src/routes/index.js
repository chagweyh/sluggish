import express from 'express';
import { signUp, getUser, getUsers } from '../controllers/userController';
import { signIn, isLoggedIn } from '../controllers/authController';
import { getChannels, getChannel, addChannel } from '../controllers/channelController';
import addMessage from '../controllers/messageController';

const router = express.Router();

/**
 * Authentication Routes
 * */
router.post('/signin', signIn);

/**
 * Users Routes
 * */
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/signup', signUp);

/**
 * Channels Routes
 * */
router.get('/channels', getChannels);
router.get('/channels/:id', getChannel);
router.post('/channels', isLoggedIn, addChannel);

/**
 * Messages Routes
 * */
router.post('/messages', isLoggedIn, addMessage);

export default router;
