const { body } = require("express-validator");

module.exports = body("admin")
  .custom((value) => {
    return value === process.env.ADMIN_PASSCODE;
  })
  .withMessage("Wrong Passcode");
