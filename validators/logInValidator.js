const { body } = require("express-validator");

module.exports = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Invalid username or password."),
  body("password")
    .isLength({ min: 8, max: 100 })
    .withMessage("Invalid username or password."),
];
