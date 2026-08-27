const { body } = require("express-validator");

module.exports = body("passcode")
  .custom((value) => {
    return value === process.env.PASSCODE;
  })
  .withMessage("Wrong Passcode");
