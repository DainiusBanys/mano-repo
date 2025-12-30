// routes/subscriptionRoutes.js

import express, { Router } from "express";
const router: Router = express.Router();
import * as subscriptionController from "../controllers/subscriptionController";
const { protect } = require("../middleware/authMiddleware"); // For private access

// POST route to initiate payment
router.post("/checkout", protect, subscriptionController.createCheckoutSession);
router.get("/verify-session", protect, subscriptionController.verifySession);

module.exports = router;
