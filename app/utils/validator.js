const Joi = require('joi');

module.exports.customerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});
module.exports.customerUpdSchema = Joi.object({
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  phone: Joi.number(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
});
