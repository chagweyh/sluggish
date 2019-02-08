import { Channel, validate } from '../models/Channel';

async function getChannels(req, res) {
  // const channels = await Channel.find().populate('owner', '_id username');
  const channels = await Channel.find();
  res.json(channels);
}

async function getChannel(req, res) {
  const channel = await Channel.find({ _id: req.params.id });
  if (!channel) return res.status(404).send('the channel with the given id was not found');
  res.json(channel);
}

async function addChannel(req, res) {
  const channel = new Channel(req.body);
  await channel.save();
  res.json(channel);
}

export { getChannels, getChannel, addChannel };
