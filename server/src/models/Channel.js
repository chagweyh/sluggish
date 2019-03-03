import mongoose from 'mongoose';
import Joi from 'joi';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
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
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

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
channelSchema.pre('find', autopopulate);

const Channel = mongoose.model('Channel', channelSchema);

const validateChannel = (channel) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    purpose: Joi.string()
      .min(5)
      .max(255),
    members: Joi.array().items(Joi.objectId()),
    private: Joi.bool(),
  };

  return Joi.validate(channel, schema);
};

export { Channel, validateChannel as validate };
