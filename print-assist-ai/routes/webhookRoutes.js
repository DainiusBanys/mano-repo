// routes/webhookRoutes.js

const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

// Stripe webhooks require the raw body, so we use a special body parser
router.post(
  "/",
  express.raw({ type: "application/json" }),
  webhookController.handleWebhook
);

module.exports = router;
