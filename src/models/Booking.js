const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        bookingNumber: {
            type: Number,
            required: true
        },
        bus: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Bus', 
            required: true 
        },
        passengerName: { 
            type: String, 
            required: true 
        },
        passengerIDNo: { 
            type: String, 
            required: true 
        },
        passengerMobile: { 
            type: String, 
            required: true 
        },
        startLocation: { 
            type: String, 
            required: true 
        },
        endLocation: { 
            type: String, 
            required: true 
        },
        seatCount: { 
            type: Number, 
            required: true 
        },
        date: { 
            type: Date, 
            required: true 
        },
        time: { 
            type: Date, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        isPaid: {
            type: Boolean,
            required: true 
        },
        isCancelled: {
            type: Boolean,
            required: true 
        },
        isUsed: {
            type: Boolean,
            required: true 
        },
        isActive: {
            type: Boolean,
            required: true 
        },
        bookingIdentificationCode: { 
            type: String, 
            required: true 
        },
    }
); 

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;