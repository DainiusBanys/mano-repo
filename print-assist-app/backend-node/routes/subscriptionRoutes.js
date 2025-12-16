// routes/subscriptionRoutes.js

const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware"); // For private access

// POST route to initiate payment
router.post("/checkout", protect, subscriptionController.createCheckoutSession);

module.exports = router;
