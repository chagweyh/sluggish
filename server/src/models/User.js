import mongoose from 'mongoose';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import config from 'config';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    stars: [{ type: mongoose.Schema.ObjectId, ref: 'Channel' }],
    // resetPasswordToken: String,
    // resetPasswordExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.methods.generateToken = async function() {
  const token = await jwt.sign(
    {
      _id: this.id,
    },
    config.get('jwt_key'),
    { expiresIn: '24h' },
  );
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
  const schema = {
    username: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(user, schema);
};

export { User, validateUser as validate };
