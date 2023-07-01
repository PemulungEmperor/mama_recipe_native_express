const Joi = require('joi')

exports.userValidation = Joi.object()
  .keys({
    id: Joi.number()
      .integer(),

    username: Joi.string()
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password should be between 3 to 30 characters and contain letters or numbers only',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
      }),
    confirmPassword: Joi.string()
      .required()
  })
