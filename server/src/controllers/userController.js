import bcrypt from 'bcrypt';
import { User, validate } from '../models/User';

async function signup(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('user already exists!');

  user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = await user.generateToken();
  const { _id, username, email, gravatar } = user;
  res.header('x-auth-token', token).send({ _id, username, email, gravatar });
}

async function getUser(req, res) {
  const user = await User.find({ _id: req.params.id });
  if (!user) return res.status(404).send('the user with the given id was not found');
  res.json(user);
}

async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

export { signup, getUser, getUsers };
