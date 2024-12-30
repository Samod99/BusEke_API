const Bus = require('../models/Bus');
const Route = require('../models/Route'); 
const User = require('../models/User'); 

exports.createBus = async (req, res) => {
  try {
    const { busNumber, capacity, routeId, operatorId, seatCount, ownershipType } = req.body;

    if (!busNumber || !capacity || !routeId || !operatorId || !ownershipType) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const routeExists = await Route.findById(routeId);
    if (!routeExists) {
      return res.status(404).json({ error: 'Route not found.' });
    }

    const operatorExists = await User.findById(operatorId);
    if (!operatorExists) {
      return res.status(404).json({ error: 'Operator not found.' });
    }

    const bus = new Bus({ busNumber, capacity, routeId, operatorId, seatCount, ownershipType });
    await bus.save();

    res.status(201).json({ message: 'Bus created successfully', bus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchBuses = async (req, res) => {
    try {
      const filter = {};
      if (req.query.busNumber && req.query.busNumber.trim()) filter.busNumber = req.query.busNumber.trim();
      if (req.query.capacity && !isNaN(req.query.capacity)) filter.capacity = parseInt(req.query.capacity);
      if (req.query.routeId && req.query.routeId.trim()) filter.routeId = req.query.routeId.trim();
      if (req.query.operatorId && req.query.operatorId.trim()) filter.operatorId = req.query.operatorId.trim();
      if (req.query.ownershipType && req.query.ownershipType.trim()) filter.ownershipType = req.query.ownershipType.trim();
  
      const buses = await Bus.find(filter).populate('routeId operatorId');
      res.status(200).json(buses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getBusById = async (req, res) => {
  try {
    const { busId } = req.params;

    const bus = await Bus.findById(busId)
      .populate('routeId', 'routeNumber startLocation endLocation')
      .populate('operatorId', 'username email role');

    if (!bus) {
      return res.status(404).json({ error: 'Bus not found.' });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(id, updateData, { new: true })
      .populate('routeId', 'routeNumber startLocation endLocation')
      .populate('operatorId', 'username email role');

    if (!updatedBus) {
      return res.status(404).json({ error: 'Bus not found.' });
    }

    res.status(200).json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBus = await Bus.findByIdAndDelete(id);

    if (!deletedBus) {
      return res.status(404).json({ error: 'Bus not found.' });
    }

    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
