import Joi from '@hapi/joi';

export default function validateMessage(message) {
  const schema = {
    text: Joi.string()
      .min(2)
      .max(50)
      .required(),
  };

  return Joi.validate(message, schema);
}
