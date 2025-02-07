const mapService = require("../services/mapsservice");
const { validationResult } = require("express-validator");

module.exports.getCoordinate = async (req, res) => {
  const { address } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getDistance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.json(distanceTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.json(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
