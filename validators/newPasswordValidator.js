const { body } = require("express-validator");

module.exports = [
  body("newPassword")
    .isLength({ min: 8, max: 100 })
    .withMessage("The password must be 8–100 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("Passwords do not match."),
  ,
];
