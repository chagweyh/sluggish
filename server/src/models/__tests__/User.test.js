import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from 'mongoose';
import { User } from '../User';

describe('user.generateToken', () => {
  it('should return a valid JWT', async () => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User(payload);
    const token = await user.generateToken();
    const decoded = await jwt.verify(token, config.get('jwt_key'));
    expect(decoded).toMatchObject(payload);
  });
});
