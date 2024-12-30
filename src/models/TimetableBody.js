const mongoose = require('mongoose');

const timeValidator = {
    validator: function(v) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);  
    },
    message: props => `${props.value} is not a valid time! Use format HH:MM`
};

const timetableBodySchema = mongoose.Schema(
    {
        headerId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'TimetableHeader', 
            required: true 
        },
        bus: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Bus', 
            required: true 
        },
        departureLocation: { 
            type: String, 
            required: true 
        },
        departureTime: { 
            type: String, 
            required: true,
            validate: timeValidator
        },
        arrivalLocation: { 
            type: String, 
            required: true 
        },
        arrivalTime: { 
            type: String, 
            required: true,
            validate: timeValidator
        },
        stops: [{ type: String }], 
    }
);

module.exports = mongoose.model('TimetableBody', timetableBodySchema);
