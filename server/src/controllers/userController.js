import bcrypt from 'bcrypt';
import { User, validate } from '../models/User';

export async function signUp(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user already exists!');

  user = new User(req.body);
  user.email = user.email.toLowerCase();
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = await user.generateToken();
  const { _id, username, email, gravatar } = user;
  return res
    .header('x-auth-token', token)
    .status(201)
    .send({ _id, username, email, gravatar });
}

export async function getUser(req, res) {
  const user = await User.find({ _id: req.params.id }).select('-password');
  if (!user) return res.status(404).send('the user with the given id was not found');
  return res.status(200).json(user);
}

export async function getUsers(req, res) {
  const users = await User.find().select('-password');
  return res.status(200).json(users);
}

export function getAccount(req, res) {
  return res.status(200).send(req.user);
}

export function validateUser(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
}
