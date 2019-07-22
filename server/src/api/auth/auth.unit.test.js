import mongoose from 'mongoose';
import User from '../users/user.model';
import isAuthenticated from './auth.middleware';
import { generateAuthToken, validateAuthToken } from './auth.service';

describe('Authentication:', () => {
  it('should populate req.user with the payload of a valid JWT', async () => {
    const userSchema = {
      _id: mongoose.Types.ObjectId().toHexString(),
    };

    const user = new User(userSchema);
    const token = await generateAuthToken(user);
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    const next = jest.fn();

    await isAuthenticated(req, res, next);

    expect(req.user).toMatchObject(userSchema);
  });

  it('should return a valid JWT', async () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
    };
    const token = await generateAuthToken(user);
    const decoded = await validateAuthToken(token);
    expect(decoded).toMatchObject(user);
  });
});
