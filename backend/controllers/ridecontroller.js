const rideService = require("../services/rideservice");
const { validationResult } = require("express-validator");
const mapService = require('../services/mapsservice');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ridemodels');

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

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    if (pickupCoordinates && pickupCoordinates.lat && pickupCoordinates.lng) {
      const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 20000);
      ride.otp = "";

      const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')
      captainsInRadius.map(captain => {
        console.log(ride, captain);
        sendMessageToSocketId(captain.socketId, { event: "new-ride", data: rideWithUser });
      });

    } else {
      console.error("Invalid pickup coordinates");
    }
  } catch (err) {
    // Only send an error response if the initial response has not been sent
    if (!res.headersSent) {
      res.status(400).json({ error: err.message });
    } else {
      console.error(err);
    }
  }
};

// get fares
module.exports.getsFares = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// confirm ride

module.exports.confirmRide = async (req, res) => { 
 const errors = validationResult(req);

 if(!errors.isEmpty()){
   return res.status(400).json({errors: errors.array()});
 }
 const {rideId} = req.body;
 
 try {
  console.log("hello")
  const ride =await rideService.confirmRide({rideId,captain:req.captain});
  
  console.log(ride,"kanunahsdkk")
   
   sendMessageToSocketId(ride.user.socketId,{event:"ride-confirmed",data:ride})
  return res.status(200).json(ride)
 } catch (error) {
  return res.status(500).json({message:error.message})
 }
  
  

}

// start ride

module.exports.startRide = async (req, res) => {
 const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {rideId,otp} = req.query;

  console.log(rideId,otp)

  try {
    const ride = await rideService.startRide({rideId,otp,captain:req.captain});
    sendMessageToSocketId(ride.user.socketId,{event:"ride-started",data:ride})
    return res.status(200).json(ride)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }

}