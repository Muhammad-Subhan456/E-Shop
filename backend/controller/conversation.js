const Conversation = require("../model/conversation");
const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { isAuthenticated } = require("../middleware/auth");
const { isSeller } = require("../middleware/auth");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

//create a new chat
router.post(
  "/create-new-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      const isConversationExists = await Conversation.findOne({ groupTitle });
      if (isConversationExists) {
        const conversation = isConversationExists;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500));
    }
  })
);

// get seller conversation
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversation = await Conversation.find(
        {
          members: {
            $in: [req.params.id],
          },
        }.sort({ updatedAt: -1, createdAt: -1 })
      );

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// update the last message
router.put(
  "/update-last-message/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

module.exports = router;
