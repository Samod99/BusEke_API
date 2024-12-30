const { validateTimetableHeader, validateTimetableBodies } = require('../validators/timetableValidator');

const validateHeader = (req, res, next) => {
    const { error } = validateTimetableHeader.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Validation Error", details: error.details });
    }
    next();
};

const validateBodies = (req, res, next) => {
    const { error } = validateTimetableBodies.validate(req.body.buses, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Validation Error", details: error.details });
    }
    next();
};

module.exports = {
    validateHeader,
    validateBodies,
};