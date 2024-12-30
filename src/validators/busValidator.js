const Joi = require('joi');

const createBusSchema = Joi.object({
  busNumber: Joi.string().required(),
  capacity: Joi.number().required(),
  routeId: Joi.string().required(),
  operatorId: Joi.string().required(),
  seatCount: Joi.number().required(),
  ownershipType: Joi.string().valid('SLTB', 'PRIVATE').required(),
});

const updateBusSchema = Joi.object({
  busNumber: Joi.string(),
  capacity: Joi.number(),
  routeId: Joi.string(),
  operatorId: Joi.string(),
  seatCount: Joi.number(),
  ownershipType: Joi.string().valid('SLTB', 'PRIVATE'),
}).or('busNumber', 'capacity', 'routeId', 'operatorId', 'seatCount', 'ownershipType');

module.exports = { createBusSchema, updateBusSchema };
