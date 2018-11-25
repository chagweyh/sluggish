import mongoose from 'mongoose';
const Message = mongoose.model('Message');

export async function getMessages(req, res) {
  const messages = await Message.find();
  res.json(messages);
}

export async function getMessage(req, res) {
  const message = await Message.find({ id: req.params.id });
  if (!message) {
    return res.status(404).send('Not found');
  }
  res.json(message);
}

export async function addMessage(req, res) {
  const message = new Message(req.body);
  await message.save();
  res.json(message);
}
