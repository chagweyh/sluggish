import { Channel, validate } from '../models/Channel';

async function getChannels(req, res) {
  // const channels = await Channel.find().populate('owner', '_id username');
  const channels = await Channel.find();
  return res.json(channels);
}

async function getChannel(req, res) {
  const channel = await Channel.find({ _id: req.params.id });
  if (!channel) return res.status(404).send('the channel with the given id was not found');
  return res.json(channel);
}

async function addChannel(req, res) {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const channel = new Channel(req.body);
  await channel.save();
  return res.json(channel);
}

export { getChannels, getChannel, addChannel };
