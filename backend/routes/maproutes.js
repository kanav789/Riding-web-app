const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

const mapcontroller = require("../controllers/mapcontroller");
const { query } = require("express-validator");

// get coordinates
router.get(
  "/getCoordinate",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authuser,
  mapcontroller.getCoordinate
);

// get distance

router.get(
  "/getdistance",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authuser,
  mapcontroller.getDistance
);

// get Suggestions
router.get(
  "/getSuggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authuser,
  mapcontroller.getSuggestions
);
module.exports = router;
