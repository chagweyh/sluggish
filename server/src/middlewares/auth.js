import jwt from 'jsonwebtoken';

export default async function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(400).('provide a token please!');
  const payload = await jwt.verify(token, process.env.JWT_KEY);
  if (payload) {
    req.user = payload;
    return next();
  } else {
    return res.status(400).send('invalidate token');
  }
}
