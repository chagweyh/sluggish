import mongoose from 'mongoose';
import { User } from '../../models/User';
import { isLoggedIn } from '../authController';

describe('Authentication:', () => {
  it('should populate req.user with the payload of a valid JWT', async () => {
    const userSchema = {
      _id: mongoose.Types.ObjectId().toHexString(),
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
