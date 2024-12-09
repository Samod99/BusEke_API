const express = require('express');
const router = express.Router();
const Route = require('../models/Route');


exports.createRoute = async (req, res) => {
  try {
    const { routeNumber, startLocation, endLocation, stops, distance, averageSpeed, duration } = req.body;

    if (!routeNumber || !startLocation || !endLocation || !stops || !distance || !averageSpeed || !duration) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingRoute = await Route.findOne({ routeNumber });
    if (existingRoute) {
      return res.status(409).json({ error: 'Route with this routeNumber already exists' });
    }

    const newRoute = new Route({ routeNumber, startLocation, endLocation, stops, distance, averageSpeed, duration });
    const savedRoute = await newRoute.save();

    res.status(201).json({ message: 'Route created successfully', route: savedRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.searchRoutes = async (req, res) => {
    try {
      const filter = {};
      if (req.query.routeNumber && req.query.routeNumber.trim()) filter.routeNumber = req.query.routeNumber.trim();
      if (req.query.startLocation && req.query.startLocation.trim()) filter.startLocation = req.query.startLocation.trim();
      if (req.query.endLocation && req.query.endLocation.trim()) filter.endLocation = req.query.endLocation.trim();
      if (req.query.stops && req.query.stops.trim()) filter.stops = { $in: [req.query.stops.trim()] };
  
      const routes = await Route.find(filter);
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


exports.getRouteById = async (req, res) => {
  try {
    const { routeId } = req.params;
    const route = await Route.findById(routeId);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRoute = await Route.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.status(200).json({ message: 'Route updated successfully', route: updatedRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Route.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};