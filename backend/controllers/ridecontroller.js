const rideService = require("../services/rideservice");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;

    const ride = await rideService.createRide({
      user: req.user._id, // Ensure user is passed here
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
