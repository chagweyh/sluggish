import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import config from 'config';
import { User } from '../models/User';

const validate = (user) => {
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

export async function signIn(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('user does not exist');

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send('verify your password');

  const token = await user.generateToken();
  return res.status(200).send(token);
}

export function validateAuth(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
}

export async function isLoggedIn(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const payload = await jwt.verify(token, config.get('jwt_key'));
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
}
