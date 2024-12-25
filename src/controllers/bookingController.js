const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking updated successfully', updatedBooking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
