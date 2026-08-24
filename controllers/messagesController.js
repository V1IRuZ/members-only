const { validationResult, matchedData } = require("express-validator");
const { validateNewMessage } = require("../validators/messagesValidator");
const Message = require("../models/Message");

function getMessages(req, res) {
  res.render("messages");
}

function getMessageForm(req, res) {
  res.render("message-form", { errors: null });
}

const postMessageForm = [
  validateNewMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("message-form", { errors: errors.array() });
    }

    const { id } = req.user;
    const { title, message } = matchedData(req);
    await Message.insertMessage(id, title, message);
    res.redirect("/");
  },
];

module.exports = {
  getMessages,
  getMessageForm,
  postMessageForm,
};
