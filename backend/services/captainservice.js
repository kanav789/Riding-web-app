const captainModel = require("../models/captainModel");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  model,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !model ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      model,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
