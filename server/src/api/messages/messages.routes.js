import express from 'express';
import getMessages from './messages.controller';

const router = express.Router();

router.get('/', getMessages);

export default router;
