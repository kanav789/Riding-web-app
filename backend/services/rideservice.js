const rideModel = require("../models/ridemodels.js");
const mapsService = require("./mapsservice.js");

const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 50,
    motorcycle: 30,
    car: 100,
  };

  const farePerKm = {
    auto: 10,
    motorcycle: 5,
    car: 20,
  };

  const farePerMinute = {
    auto: 2,
    motorcycle: 1,
    car: 3,
  };

  const distanceInKm = parseFloat(distanceTime.distance.replace(" km", ""));
  const durationInMinutes = parseFloat(
    distanceTime.duration
      .replace(" hours", "")
      .replace(" mins", "")
      .split(" ")
      .reduce((acc, time) => acc * 60 + parseFloat(time), 0)
  );

  const fare = {
    auto:
      baseFare.auto +
      farePerKm.auto * distanceInKm +
      farePerMinute.auto * durationInMinutes,
    car:
      baseFare.car +
      farePerKm.car * distanceInKm +
      farePerMinute.car * durationInMinutes,
    motorcycle:
      baseFare.motorcycle +
      farePerKm.motorcycle * distanceInKm +
      farePerMinute.motorcycle * durationInMinutes,
  };
  console.log(distanceTime);
  console.log(fare, "fare");
  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1)
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  // Added user to the parameter list
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, pickup, destination and vehicle type are required");
  }

  const fare = await getFare(pickup, destination);
  console.log(fare);

  const ride = new rideModel({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};
