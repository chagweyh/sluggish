import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

const JWT_KEY = config.get('jwt_key');
const SALT_ROUNDS = 10;

export async function encryptPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, targetPassword) {
  return bcrypt.compare(password, targetPassword);
}

export async function generateAuthToken(user) {
  const payload = {
    _id: user._id,
  };

  const token = await jwt.sign(payload, JWT_KEY, {
    expiresIn: '7d',
  });

  return token;
}

const AUTH_HEADER_BEARER = /^Bearer /g;
const AUTH_HEADER_JWT = /^JWT /g;

export function extractAuthToken(authHeader = '') {
  let token = '';

  if (AUTH_HEADER_BEARER.test(authHeader)) {
    token = authHeader.replace(AUTH_HEADER_BEARER, '').trim();
  } else if (AUTH_HEADER_JWT.test(authHeader)) {
    token = authHeader.replace(AUTH_HEADER_JWT, '').trim();
  } else {
    token = '';
  }

  return token;
}

export async function validateAuthToken(token) {
  return jwt.verify(token, JWT_KEY);
}
