const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const rideController = require("../controllers/ridecontroller");
const authmidlleware = require("../middleware/authmiddleware");

router.post(
  "/create",
  authmidlleware.authuser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination Location"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "motorcycle", "car"])
    .isLength({ min: 3 })
    .withMessage("Invalid Vehicle Type"),
  rideController.createRide
);

module.exports = router;
