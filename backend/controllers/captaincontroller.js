const captainModel = require("../models/captainModel");
const captainservice = require("../services/captainservice");
const { validationResult } = require("express-validator");
const blacklisttokenModel = require("../models/blacklisttokenModel");
module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isEmailExist = await captainModel.findOne({ email });
    console.log(isEmailExist);
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
    res.cookie("token", token);
    return res
      .status(201)
      .json({ message: "Captain registered successfully", token, captain });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = await captain.generateToken();
    res.cookie("token", token);
    console.log("login sucees");
    return res
      .status(200)
      .json({ message: "Login successful", token, captain });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({
    message: "Captain profile fetched successfully",
    captain: req.captain,
  });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklisttokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Captain logged out successfully" });
};

