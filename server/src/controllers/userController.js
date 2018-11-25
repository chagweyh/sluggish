import mongoose from 'mongoose';
const User = mongoose.model('User');

export async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

export async function getUser(req, res) {
  const user = await User.find({ id: req.params.id });
  res.json(user);
}

export async function addUser(req, res) {
  const user = new User(req.body);
  await user.save();
  res.json(user);
}
