import express from 'express';
import auth from '../api/auth/auth.routes';
import channels from '../api/channels/channels.routes';
import messages from '../api/messages/messages.routes';
import users from '../api/users/users.routes';

const router = express.Router();

router.use('/auth', auth);
router.use('/channels', channels);
router.use('/messages', messages);
router.use('/users', users);

export default router;
