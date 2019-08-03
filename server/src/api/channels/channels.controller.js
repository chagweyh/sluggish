import Channel from './channel.model';
import User from '../users/user.model';
import Message from '../messages/message.model';

export async function addChannel(req, res) {
  const channel = await Channel.findOne({ name: req.body.name });
  if (channel) return res.status(409).send('channel already exists!');
  const newChannel = new Channel({ ...req.body, createdBy: req.user._id });
  await newChannel.save();
  return res.status(201).json(newChannel);
}

export async function getChannel(req, res) {
  const channel = await Channel.findOne({ slug: req.params.slug });
  if (!channel)
    return res
      .status(404)
      .send('the channel with the given slug was not found');
  return res.status(200).json(channel);
}

export async function getChannels(req, res) {
  const channels = await Channel.find();
  return res.status(200).json(channels);
}

export async function deleteChannel(req, res) {
  const channel = await Channel.findOne({ _id: req.params.id });

  if (!channel)
    return res.status(404).send('the channel with the given id was not found');

  if (channel.createdBy._id.toString() !== req.user._id) {
    return res.status(403).send('user is unauthorized');
  }

  await channel.remove();
  return res.status(200).json(channel);
}

export async function starChannel(req, res) {
  let user = await User.findOne({ _id: req.user._id });

  const stars = user.stars.map((obj) => obj.toString());

  const operator = stars.includes(req.params.id) ? '$pull' : '$addToSet';

  user = await User.findByIdAndUpdate(
    req.user._id,
    { [operator]: { stars: req.params.id } },
    { new: true },
  );

  return res.status(200).json(user);
}

export async function addMessage(req, res) {
  const message = new Message({
    ...req.body,
    channel: req.params.id,
    createdBy: req.user._id,
  });
  await message.save();
  await message.populate('createdBy', '-password').execPopulate();
  return res.status(201).json(message);
}
