import { Message, validate } from '../models/Message';

async function addMessage(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = new Message(req.body);
  await message.save();
  await message.populate('author', '-password').execPopulate();
  console.log(message);
  return res.json(message);
}

export default addMessage;
