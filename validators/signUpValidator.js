const { body } = require("express-validator");
const User = require("../models/User");

const validateSignUp = [
  body("firstname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The first name must be 2–30 characters long"),
  body("lastname")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("The last name must be 2–30 characters long"),
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("The username must be 3–50 characters long")
    .custom(async (username) => {
      const user = await User.findUsername(username);

      if (user) {
        throw new Error("Username is already taken.");
      }

      return true;
    }),
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("The password must be 8–100 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];

module.exports = validateSignUp;
