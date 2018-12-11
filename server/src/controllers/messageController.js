import { Message, validate } from '../models/Message';

async function addMessage(req, res) {
  console.log(req.body);
  const message = new Message(req.body);
  await message.save();
  res.json(message);
  // console.log(req.body);
}

export { addMessage };
