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
    const hashedPassword = await UserModel.hashPassword(password);
    // create user
    const user = await userService.createUser({
      firstname: fullname.firstname,

      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });
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
