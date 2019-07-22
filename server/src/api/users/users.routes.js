import express from 'express';
import { getUser, getUsers, getCurrentUser } from './users.controller';
import isAuthenticated from '../auth/auth.middleware';
import { validateObjectId } from '../../middlewares';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', isAuthenticated, getCurrentUser);
router.get('/:id', validateObjectId, getUser);

export default router;
