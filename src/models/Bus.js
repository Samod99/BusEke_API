const mongoose = require('mongoose');

const busSchema = mongoose.Schema(
    {
        busNumber: { 
            type: String, 
            required: true, 
            unique: true 
        },
        capacity: { 
            type: Number, 
            required: true 
        },
        routeId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Route', 
            required: true 
        },
        operatorId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        seatCount: {
            type: Number, 
            required: true
        },
        ownershipType: { 
            type: String, 
            enum: ['SLTB', 'PRIVATE'], 
            required: true 
        }
    }
);

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;