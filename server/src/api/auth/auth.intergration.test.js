import request from 'supertest';
import mongoose from 'mongoose';
import { generateAuthToken } from './auth.service';
import User from '../users/user.model';
import Message from '../messages/message.model';
import app from '../../app';

describe('auth middleware', () => {
  afterEach(async () => {
    await Message.deleteMany({});
  });

  let token;

  const exec = () => {
    return request(app)
      .post('/api/messages')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'random message',
        channel: mongoose.Types.ObjectId(),
      });
  };

  beforeEach(async () => {
    const user = new User();
    token = await generateAuthToken(user);
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(201);
  });
});
