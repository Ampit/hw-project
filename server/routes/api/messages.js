const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
    // find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    // if there is a conversation and conversationId, check if they don't match
    // if there is not a conversation found but there is a conversationId provided, we have an error
    if (
      (conversation && conversationId && conversation.id !== conversationId) ||
      (!conversation && conversationId)
    ) {
      return res.sendStatus(401);
    }
    // brand new conversation
    if (!conversation && !conversationId) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      const session = await Session.findOne({
        where: {
          data: {
            [Op.like]: `%"id":${sender.id}%`,
          },
        },
      });
      if (session) sender.online = true;
    }
    // check if the recipient has the conversation as active set readStatus to true

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId } = req.body;

    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    await Message.update(
      {
        readStatus: true,
      },
      {
        where: {
          [Op.and]: {
            senderId: recipientId,
            conversationId: conversation.id,
          },
        },
        returning: true,
      }
    );

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
