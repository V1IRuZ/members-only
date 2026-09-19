const { validationResult, matchedData } = require("express-validator");
const {
  validateNewMessage,
  validateMessageId,
} = require("../validators/messagesValidator");
const Message = require("../models/Message");

async function getMessages(req, res) {
  const msgs = await Message.getMessages();
  res.render("messages", { msgs: msgs });
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

const postDeleteMessage = [
  validateMessageId,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("invalid", {
        status: 400,
        name: "BadRequest",
        errors: errors.array(),
      });
    }

    const { id } = matchedData(req);
    await Message.deleteMessage(id);
    res.redirect("/");
  },
];

module.exports = {
  getMessages,
  getMessageForm,
  postMessageForm,
  postDeleteMessage,
};
