const Joi = require('joi');

const createBookingSchema = Joi.object({
  bookingNumber: Joi.number().required(),
  bus: Joi.string().required(),
  passengerName: Joi.string().required(),
  passengerIDNo: Joi.string().required(),
  passengerMobile: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
  startLocation: Joi.string().required(),
  endLocation: Joi.string().required(),
  seatCount: Joi.number().integer().min(1).required(),
  date: Joi.date().required(),
  time: Joi.date().required(),
  price: Joi.number().positive().required(),
  isPaid: Joi.boolean().required(),
  isCancelled: Joi.boolean().required(),
  isUsed: Joi.boolean().required(),
  isActive: Joi.boolean().required(),
  bookingIdentificationCode: Joi.string().required(),
});

const updateBookingSchema = Joi.object({
    bookingNumber: Joi.number(),
    bus: Joi.string(),
    passengerName: Joi.string(),
    passengerIDNo: Joi.string(),
    passengerMobile: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),
    startLocation: Joi.string(),
    endLocation: Joi.string(),
    seatCount: Joi.number().integer().min(1),
    date: Joi.date(),
    time: Joi.date(),
    price: Joi.number().positive(),
    isPaid: Joi.boolean(),
    isCancelled: Joi.boolean(),
    isUsed: Joi.boolean(),
    isActive: Joi.boolean(),
    bookingIdentificationCode: Joi.string(),
  }).or('bookingNumber', 'bus', 'passengerName', 'passengerIDNo', 'passengerMobile','startLocation', 'endLocation', 'seatCount', 'date', 'time', 'price', 'isPaid', 'isCancelled', 'isUsed', 'isActive', 'bookingIdentificationCode');
  

module.exports = { createBookingSchema, updateBookingSchema };
