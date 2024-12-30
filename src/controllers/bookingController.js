const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const {
      busNumber,
      passengerName,
      passengerIDNo,
      passengerMobile,
      startLocation,
      endLocation,
      seatCount,
      date,
      time
    } = req.body;

    const price = seatCount * 100;

    const timestamp = new Date().getTime();
    const bookingIdentificationCode = `${busNumber}-${new Date(date).toISOString().split('T')[0]}-${timestamp}`;

    const bookingData = {
      busNumber,
      passengerName,
      passengerIDNo,
      passengerMobile,
      startLocation,
      endLocation,
      seatCount,
      date,
      time,
      price,
      isPaid: false, 
      isCancelled: false, 
      isUsed: false, 
      isActive: true, 
      bookingIdentificationCode
    };
    
    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const filter = {};
    
    if (req.query.busNumber && req.query.busNumber.trim()) {
      filter.busNumber = req.query.busNumber.trim();
    }
    if (req.query.passengerIDNo && req.query.passengerIDNo.trim()) {
      filter.passengerIDNo = req.query.passengerIDNo.trim();
    }
    if (req.query.bookingIdentificationCode && req.query.bookingIdentificationCode.trim()) {
      filter.bookingIdentificationCode = req.query.bookingIdentificationCode.trim();
    }
    if (req.query.date && req.query.date.trim()) {
      const queryDate = new Date(req.query.date.trim()).toISOString().split('T')[0];
      filter.date = queryDate;
    }

    const bookings = await Booking.find(filter);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

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
