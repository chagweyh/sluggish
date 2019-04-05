import { Channel, validate } from '../models/Channel';
import { User } from '../models/User';

export async function getChannels(req, res) {
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

export async function deleteChannel(req, res) {
  const channel = await Channel.findByIdAndDelete(req.params.id);
  if (!channel) return res.status(404).send('the channel with the given id was not found');
  if (channel.createdBy._id !== req.user._id) return res.status(403).send('user is unauthorized');
  return res.status(200).json(channel);
}

export async function starChannel(req, res) {
  let user = await User.findById(req.user._id);
  const stars = user.stars.map((obj) => obj.toString());
  const operator = stars.includes(req.params.id) ? '$pull' : '$addToSet';
  user = await User.findByIdAndUpdate(req.user._id, { [operator]: { stars: req.params.id } }, { new: true });
  return res.status(200).json(user);
}

export function validateChannel(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
}
