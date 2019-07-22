import Message from './message.model';

export default async function getMessages(req, res) {
  const messages = await Message.find();
  return res.status(200).json(messages);
}
