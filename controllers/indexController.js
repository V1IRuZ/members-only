const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");
const validateSignUp = require("../validators/signUpValidator");
const validateMembership = require("../validators/membershipValidator");
const validateAdmin = require("../validators/adminValidator");
const validateNewPassword = require("../validators/newPasswordValidator");
const User = require("../models/User");
const Message = require("../models/Message");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function getHome(req, res) {
  const msgs = await Message.getMemberMessages();
  const successMessage = req.session.successMessage;
  const loginMessage = req.session.messages?.[0];

  delete req.session.successMessage;
  delete req.session.messages;

  if (req.user) {
    const { id } = req.user;
    const { count } = await Message.getUserNumOfMessages(id);

    return res.render("index", {
      msgs: msgs,
      loginMessage: loginMessage,
      messagesCount: count,
      successMessage: successMessage,
    });
  }

  res.render("index", {
    msgs: msgs,
    loginMessage: loginMessage,
    successMessage: successMessage,
  });
}

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

      req.session.successMessage = "User created successfully.";
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

    req.session.successMessage = "You have been upgraded to a member.";
    res.redirect("/");
  },
];

function getAdmin(req, res) {
  res.render("admin", { errors: null });
}

const postAdmin = [
  validateAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("admin", {
        errors: errors.array(),
      });
    }

    const { id } = req.user;

    await User.updateUserToAdmin(id);

    req.session.successMessage = "You have been upgraded to a admin.";
    res.redirect("/");
  },
];

function getChangePassword(req, res) {
  res.render("change-password", { errors: null });
}

const postChangePassword = [
  validateNewPassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("change-password", { errors: errors.array() });
    }

    const { currentPassword, newPassword } = matchedData(req);

    try {
      const user = await User.getUserById(req.user.id);

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!passwordMatch) {
        return res.status(400).render("change-password", {
          errors: [{ msg: "Current password is incorrect." }],
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.updateUserPassword(req.user.id, hashedPassword);

      req.session.successMessage = "Password successfully changed.";
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
];

function getInvalidRoute(req, res) {
  throw new CustomNotFoundError("Page not found");
}

module.exports = {
  getHome,
  getLogOut,
  getSignUp,
  postSignUp,
  getMembership,
  postMembership,
  getAdmin,
  postAdmin,
  getChangePassword,
  postChangePassword,
  getInvalidRoute,
};
