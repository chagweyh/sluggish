import express from 'express';
import { getChannels, getChannel, addChannel, validateChannel } from '../controllers/channelController';
import { signUp, getUser, getUsers, getAccount, validateUser } from '../controllers/userController';
import { signIn, validateAuth, isLoggedIn } from '../controllers/authController';
import { addMessage, validateMessage } from '../controllers/messageController';
import validateObjectId from '../utils/validateObjectId';

const router = express.Router();

router.post('/signin', validateAuth, signIn);
router.post('/signup', validateUser, signUp);

router.get('/users', getUsers);
router.get('/users/:id', validateObjectId, getUser);

router.get('/account', isLoggedIn, getAccount);

router.get('/channels', getChannels);
router.get('/channels/:id', validateObjectId, getChannel);
router.post('/channels', [isLoggedIn, validateChannel], addChannel);

router.post('/messages', [isLoggedIn, validateMessage], addMessage);

export default router;
