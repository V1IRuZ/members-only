const { body } = require("express-validator");

const validateNewMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Title can be 1-50 characters long"),
  body("message")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Message can be 1-200 characters long"),
];

module.exports = {
  validateNewMessage,
};
