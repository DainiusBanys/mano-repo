// routes/normalizerRoutes.js

const express = require("express");
const router = express.Router();
const normalizerController = require("../controllers/normalizerController");
const { protect } = require("../middleware/authMiddleware"); // For JWT authentication
const { checkSubscription } = require("../middleware/subscriptionMiddleware"); // check for subcription for normalize

// POST route to submit data for cleanup
router.post(
  "/process",
  protect,
  checkSubscription,
  normalizerController.processData
);

module.exports = router;
