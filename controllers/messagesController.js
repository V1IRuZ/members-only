function getMessages(req, res) {
  res.render("messages");
}

function getMessagesForm(req, res) {
  res.render("message-form");
}

module.exports = {
  getMessages,
  getMessagesForm,
};
