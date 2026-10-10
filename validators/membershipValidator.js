const { body } = require("express-validator");

module.exports = body("passcode")
  .custom((value) => {
    return value === process.env.MEMBER_PASSCODE;
  })
  .withMessage("Wrong Passcode");
