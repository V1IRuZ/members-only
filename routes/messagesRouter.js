const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");

messagesRouter.get("/", messagesController.getMessages);
messagesRouter.get("/new", messagesController.getMessagesForm);

module.exports = messagesRouter;
