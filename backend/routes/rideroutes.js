const express = require("express");

const router = express.Router();
const { body, query } = require("express-validator");
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

router.get(
  "/fares",
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination"),
  authmidlleware.authuser,
  rideController.getsFares
);

router.post('/confirm',authmidlleware.authcaptain, body('rideId').isMongoId().withMessage('Invalid ride id'),rideController.confirmRide)
module.exports = router;
