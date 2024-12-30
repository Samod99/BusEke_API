const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('admin', 'operator', 'passenger').required(),
  //isActive: Joi.boolean().required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string().valid('admin', 'operator', 'passenger'),
  //isActive: Joi.boolean(),
}).or('username', 'email', 'password', 'role'); 

module.exports = { createUserSchema, updateUserSchema };
