import mongoose from 'mongoose';
const Channel = mongoose.model('Channel');

export async function getChannels(req, res) {
  const channels = await Channel.find();
  res.json(channels);
}

export async function getChannel(req, res) {
  const channel = await Channel.find({ id: req.params.id });
  if (!channel) {
    return res.status(404).send('Not found');
  }
  res.json(channel);
}

export async function addChannel(req, res) {
  const channel = new Channel(req.body);
  await channel.save();
  res.json(channel);
}
