import express from 'express';
import { signIn, signUp } from './auth.controller';
import { validate } from '../../middlewares';
import validateAuth from './auth.validator';
import validateUser from '../users/user.validator';

const router = express.Router();

router.post('/signin', validate(validateAuth), signIn);
router.post('/signup', validate(validateUser), signUp);

export default router;
