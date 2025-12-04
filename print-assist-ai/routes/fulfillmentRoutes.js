// routes/fulfillmentRoutes.js

const express = require("express");
const router = express.Router();
const fulfillmentController = require("../controllers/fulfillmentController");
const { protect } = require("../middleware/authMiddleware");
const { checkSubscription } = require("../middleware/subscriptionMiddleware");

// POST route to submit the order for printing
router.post(
  "/submit",
  protect,
  checkSubscription,
  fulfillmentController.submitOrder
);

module.exports = router;
