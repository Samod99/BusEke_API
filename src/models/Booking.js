const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const timeValidator = {
    validator: function(v) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);  
    },
    message: props => `${props.value} is not a valid time! Use format HH:MM`
};

const bookingSchema = mongoose.Schema(
    {
        busNumber: { 
            type: String, 
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
            type: String, 
            required: true, 
            validate: timeValidator
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

bookingSchema.plugin(AutoIncrement, { inc_field: 'bookingNumber' });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;