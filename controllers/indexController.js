const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult, matchedData } = require("express-validator");
const validateSignUp = require("../validators/signUpValidator");
const validateMembership = require("../validators/membershipValidator");
const User = require("../models/User");
const Message = require("../models/Message");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function getHome(req, res) {
  const msgs = await Message.getMemberMessages();
  const loginMessage = req.session.messages?.[0];

  delete req.session.messages;

  res.render("index", { msgs: msgs, loginMessage: loginMessage });
}

const postLogIn = [
  validateLogIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
];

function getLogOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
}

function getSignUp(req, res) {
  res.render("sign-up", {
    firstname: "",
    lastname: "",
    username: "",
    errors: null,
  });
}

const postSignUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const values = matchedData(req);

      return res.status(400).render("sign-up", {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        errors: errors.array(),
      });
    }

    try {
      const { firstname, lastname, username, password, confirmPassword } =
        matchedData(req);

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.insertUser(firstname, lastname, username, hashedPassword);

      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

function getMembership(req, res) {
  res.render("membership", { errors: null });
}

const postMembership = [
  validateMembership,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("membership", {
        errors: errors.array(),
      });
    }

    const { id } = req.user;
    await User.updateUserMembership(id);
    res.redirect("/");
  },
];

function getInvalidRoute(req, res) {
  throw new CustomNotFoundError("Page not found");
}

module.exports = {
  getHome,
  postLogIn,
  getLogOut,
  getSignUp,
  postSignUp,
  getMembership,
  postMembership,
  getInvalidRoute,
};
