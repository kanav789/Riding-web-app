const captainModel = require("../models/captainModel");
const captainservice = require("../services/captainservice");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    console.log(req.body);
    const isEmailExist = await captainModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainservice.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      model: vehicle.model,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = await captain.generateToken();
    return res
      .status(201)
      .json({ message: "Captain registered successfully", token, captain });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
