const Joi = require('joi');

const createRouteSchema = Joi.object({
  routeNumber: Joi.string().required(),
  startLocation: Joi.string().required(),
  endLocation: Joi.string().required(),
  stops: Joi.array().items(Joi.string().required()).min(1).required(), 
  distance: Joi.number().positive().required(), 
  averageSpeed: Joi.number().positive().required(), 
  duration: Joi.number().positive().required(), 
});

const updateRouteSchema = Joi.object({
  routeNumber: Joi.string(),
  startLocation: Joi.string(),
  endLocation: Joi.string(),
  stops: Joi.array().items(Joi.string().required()).min(1),
  distance: Joi.number().positive(),
  averageSpeed: Joi.number().positive(),
  duration: Joi.number().positive(),
}).or('routeNumber', 'startLocation', 'endLocation', 'stops', 'distance', 'averageSpeed', 'duration');

module.exports = { createRouteSchema, updateRouteSchema };
