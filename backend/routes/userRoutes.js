const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be atleat 3 character"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleat 8 character"),
  ],
  userControllers.registerUser
);
module.exports = router;
