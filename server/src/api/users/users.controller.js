import User from './user.model';

export async function getUser(req, res) {
  const user = await User.find({ _id: req.params.id }).select('-password');
  if (!user)
    return res.status(404).send('the user with the given id was not found');
  return res.status(200).json(user);
}

export async function getUsers(req, res) {
  const users = await User.find().select('-password');
  return res.status(200).json(users);
}

export async function getCurrentUser(req, res) {
  const user = await User.findById(req.user._id).select('-password');
  return res.status(200).send(user);
}
