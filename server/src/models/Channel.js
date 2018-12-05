import mongoose from 'mongoose';
import Joi from 'joi';

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  purpose: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  private: {
    type: Boolean,
    default: false,
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  // messages: [
  //   {
  //     messageId: { type: mongoose.Schema.ObjectId, ref: 'Message' },
  //     readBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  //   },
  // ],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
});

channelSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'channel',
});

function autopopulate(next) {
  this.populate('messages');
  next();
}

channelSchema.pre('findOne', autopopulate);

const Channel = mongoose.model('Channel', channelSchema);

const validateChannel = channel => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    purpose: Joi.string()
      .min(5)
      .max(255),
    members: Joi.array().items(Joi.objectId()),
    owner: Joi.objectId().required(),
  };

  return Joi.validate(channel, schema);
};

export { Channel, validateChannel as validate };
