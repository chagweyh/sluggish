import Joi from '@hapi/joi';

export default function validateChannel(channel) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    purpose: Joi.string()
      .min(5)
      .max(255),
    members: Joi.array(),
    private: Joi.boolean(),
    createdBy: Joi.objectId(),
  };

  return Joi.validate(channel, schema);
}
