const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authmiddleware");
const { body } = require("express-validator");
// register user
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

// login user
router.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid Email")],
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleat 8 character"),
  userControllers.loginUser
);

// user profile

router.get("/profile", authMiddleware.authuser, userControllers.getUserProfile);

router.get("/logout", authMiddleware.authuser, userControllers.logoutUser);


module.exports = router;
