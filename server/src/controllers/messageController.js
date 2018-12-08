import { Message, validate } from '../models/Message';

async function getMessages(req, res) {
  const messages = await Message.find()
    .populate('author')
    .populate('channel');
  res.json(messages);
}

async function getMessage(req, res) {
  const message = await Message.find({ _id: req.params.id });
  if (!message) return res.status(404).send('the message with the given id was not found');
  res.json(message);
}

async function addMessage(req, res) {
  const message = new Message(req.body);
  await message.save();
  res.json(message);
  // console.log(req.body);
}

export { getMessages, getMessage, addMessage };
