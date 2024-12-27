const Joi = require('joi');

const validateTimetableHeader = Joi.object({
    route: Joi.string().required().label("Route ID"),
    creater: Joi.string().required().label("Creater ID"),
    validFrom: Joi.date().required().label("Valid From"),
    validTo: Joi.date().required().label("Valid To"),
    isActive: Joi.boolean().required().label("Is Active"),
});

const validateTimetableBody = Joi.object({
    headerId: Joi.string().required().label("Header ID"),
    bus: Joi.string().required().label("Bus ID"),
    departureLocation: Joi.string().required().label("Departure Location"),
    departureTime: Joi.date().required().label("Departure Time"),
    arrivalLocation: Joi.string().required().label("Arrival Location"),
    arrivalTime: Joi.date().required().label("Arrival Time"),
    stops: Joi.array().items(Joi.string()).label("Stops"),
});

const validateTimetableBodies = Joi.array().items(validateTimetableBody);

module.exports = {
    validateTimetableHeader,
    validateTimetableBody,
    validateTimetableBodies,
};
