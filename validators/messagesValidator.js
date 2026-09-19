const { body, param } = require("express-validator");

const validateMessageId = param("id")
  .isInt({ min: 1 })
  .withMessage("The message route must correspond to the message ID integer");

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
  validateMessageId,
};
