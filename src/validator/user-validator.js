const Joi = require('joi');
const customerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.number().integer().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  address: Joi.string().required(),
  role: Joi.string().valid('CUSTOMER', 'TECHNICIAN', 'ADMIN').required(),
  profilePic: Joi.string().allow(''),
  expertiseOn: Joi.array().when('role', {
    is: 'TECHNICIAN',
    then: Joi.array().length(1).required(),
    otherwise: Joi.allow(''),
  }),
  legalDocs: Joi.string(),
});

module.exports = customerSchema;
