import { Channel, validate } from '../models/Channel';

export async function getChannels(req, res) {
  // const channels = await Channel.find().populate('owner', '_id username');
  const channels = await Channel.find();
  return res.status(200).json(channels);
}

export async function getChannel(req, res) {
  const channel = await Channel.findOne({ _id: req.params.id });
  if (!channel) return res.status(404).send('the channel with the given id was not found');
  return res.status(200).json(channel);
}

export async function addChannel(req, res) {
  const createdBy = req.user._id;
  const channel = new Channel({ ...req.body, createdBy });
  await channel.save();
  return res.status(201).json(channel);
}

export function validateChannel(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
}
