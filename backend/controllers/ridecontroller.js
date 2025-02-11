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


// get fares

module.exports.getsFares = async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const { pickup, destination } = req.query;
     const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
}