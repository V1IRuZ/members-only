const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

messagesRouter.get("/", messagesController.getMessages);
messagesRouter.get("/members", messagesController.getMemberMessages);
messagesRouter.get(
  "/me",
  requireAuth,
  messagesController.getCurrentUserMessages,
);
messagesRouter.get("/new", requireAuth, messagesController.getMessageForm);
messagesRouter.post("/new", requireAuth, messagesController.postMessageForm);
messagesRouter.post(
  "/:id/delete",
  requireAdmin,
  messagesController.postDeleteMessage,
);

module.exports = messagesRouter;
