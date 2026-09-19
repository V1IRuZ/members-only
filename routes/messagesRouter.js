const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
const requireAuth = require("../middleware/requireAuth");

messagesRouter.get("/", messagesController.getMessages);
messagesRouter.get("/new", requireAuth, messagesController.getMessageForm);
messagesRouter.post("/new", messagesController.postMessageForm);
messagesRouter.post("/:id/delete", messagesController.postDeleteMessage);

module.exports = messagesRouter;
