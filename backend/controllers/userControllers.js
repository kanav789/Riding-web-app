const UserModel = require("../models/userModel");
const userService = require("../services/userservice");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    console.log(req.body);
    const { fullname, email, password } = req.body;

    const alreadyExists = await UserModel.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    console.log("Time to hash password");
    const hashedPassword = await UserModel.hashPassword(password);
    console.log("Time to create user");
    // create user
    const user = await userService.createUser({
      firstname: fullname.firstname,

      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
    console.log("Time to generate jwt");
    // generate jwt
    const token = user.generateJWT();
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error); // Add error logging
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateJWT();
  res.status(200).json({ user, token });
};
