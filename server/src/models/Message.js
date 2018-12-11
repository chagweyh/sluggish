import mongoose from 'mongoose';
import Joi from 'joi';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  channel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Channel',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  readBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

function autopopulate(next) {
  this.populate('author', 'username _id');
  next();
}

messageSchema.pre('findOne', autopopulate);
messageSchema.pre('find', autopopulate);

const Message = mongoose.model('Message', messageSchema);

const validateMessage = message => {
  const schema = {
    text: Joi.string()
      .min(2)
      .max(50)
      .required(),
    author: Joi.objectId().required(),
    channel: Joi.objectId().required(),
  };

  return Joi.validate(message, schema);
};

export { Message, validateMessage as validate };
