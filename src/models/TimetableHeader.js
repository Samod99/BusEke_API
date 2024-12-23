const mongoose = require('mongoose');

const timetableHeaderSchema = mongoose.Schema(
    {
        route: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Route', 
            required: true 
        }, 
        creater: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }, 
        validFrom: { 
            type: Date, 
            required: true 
        },
        validTo: { 
            type: Date, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        isActive: {
            type: Boolean,
            required: true 
        }
    }
);

module.exports = mongoose.model('TimetableHeader', timetableHeaderSchema);
