const { body } = require("express-validator");

const validateNewMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title must be 1-50 characters long"),
  body("message")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage("Message must be 1-300 characters long"),
];

module.exports = {
  validateNewMessage,
};
