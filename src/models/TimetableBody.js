const mongoose = require('mongoose');

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
            type: Date, 
            required: true 
        },
        arrivalLocation: { 
            type: String, 
            required: true 
        },
        arrivalTime: { 
            type: Date, 
            required: true 
        },
        stops: [{ type: String }], 
    }
);

module.exports = mongoose.model('TimetableBody', timetableBodySchema);
