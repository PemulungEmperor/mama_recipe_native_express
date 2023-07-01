const Joi = require('joi')

exports.productValidation = Joi.object()
  .keys({
    id: Joi.number()
      .integer(),

    user_id: Joi.number()
      .integer(),

    category_id: Joi.number()
      .integer(),

    food_name: Joi.string()
      .required(),

    ingredients: Joi.string()
      .required(),

    video_recipe: Joi.string()
      .required()
  })
