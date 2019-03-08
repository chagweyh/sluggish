import mongoose from 'mongoose';
// import request from 'request';
import { User } from '../../models/User';
import { isLoggedIn } from '../authController';
// import { Channel } from '../../models/Channel';

describe('Authentication:', () => {
  it('should populate req.user with the payload of a valid JWT', async () => {
    const userSchema = {
      _id: mongoose.Types.ObjectId().toHexString(),
      email: 'hello@hello.com',
    };

    const user = new User(userSchema);
    const token = await user.generateToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    await isLoggedIn(req, res, next);

    expect(req.user).toMatchObject(userSchema);
  });
});
