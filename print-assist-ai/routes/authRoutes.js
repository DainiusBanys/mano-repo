// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // <--- NEW IMPORT for JWT use

// Define the route for registration
// The POST request hits the register function we just created
// Route 1: Register (existing)
router.post("/register", authController.register);

// Route 2: Login (NEW)
router.post("/login", authController.login);

// Route 3: Get User Profile (NEW)
// The 'protect' middleware runs BEFORE getProfile
router.get("/profile", protect, authController.getProfile); // <--- JWT useping profile check

module.exports = router;
