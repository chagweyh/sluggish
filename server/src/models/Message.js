import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: String,
  channel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Channel',
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Message', messageSchema);
