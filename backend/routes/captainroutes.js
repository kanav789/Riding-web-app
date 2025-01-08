const express = require("express");

const router = express.Router();

const { body } = require("express-validator");
const captaincontroller = require("../controllers/captaincontroller");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters"),
    body("vehicle.model")
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captaincontroller.registerCaptain
);

module.exports = router;
