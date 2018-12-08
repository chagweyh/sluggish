import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

async function signin(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('user does not exist');

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send('verify your password');

  const token = await user.generateToken();
  res.send(token);
}

async function signout(req, res) {
  const user = new User(req.body);
  await user.save();
  res.json(user);
}

async function isLoggedIn(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const payload = await jwt.verify(token, process.env.JWT_KEY);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

const validate = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(user, schema);
};

export { signin, signout, isLoggedIn };
