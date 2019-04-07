import { Message, validate } from '../models/Message';

export async function addMessage(req, res) {
  const message = new Message({ ...req.body, createdBy: req.user._id });
  await message.save();
  await message.populate('createdBy', '-password').execPopulate();
  return res.status(201).json(message);
}

export function validateMessage(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
}
