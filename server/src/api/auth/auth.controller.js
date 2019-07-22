import User from '../users/user.model';
import {
  comparePassword,
  generateAuthToken,
  encryptPassword,
} from './auth.service';

export async function signIn(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('user does not exist');

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) return res.status(400).send('verify your password');

  const token = await generateAuthToken(user);
  return res.status(200).send(token);
}

export async function signUp(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send('user already exists!');

  user = new User(req.body);
  user.email = user.email.toLowerCase();
  user.password = await encryptPassword(user.password);
  await user.save();

  const token = await generateAuthToken(user);
  const { _id, username, email } = user;
  return res.status(201).send({ user: { _id, username, email }, token });
}
