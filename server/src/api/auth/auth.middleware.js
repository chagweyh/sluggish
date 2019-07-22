import { extractAuthToken, validateAuthToken } from './auth.service';

export default async function isAuthenticated(req, res, next) {
  const token = extractAuthToken(req.headers.authorization);
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const payload = await validateAuthToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
