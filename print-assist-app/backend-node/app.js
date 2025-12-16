// backend-node/app.js (FINAL CLEANED VERSION)

const express = require("express");
const cors = require("cors");
const app = express();
// NOTE: We don't need require("dotenv") here, as server.js handles it.

// Import DB connection and instance
// const { connectDB, sequelize } = require("./config/config");

// --- Import Routes ---
const authRoutes = require("./routes/authRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const normalizerRoutes = require("./routes/normalizerRoutes");
const fulfillmentRoutes = require("./routes/fulfillmentRoutes");

// --- CRITICAL FIX 1: Sequence Connection ---
// 1. Connection should be authenticated early, but only called ONCE.
// connectDB(); // <--- KEEP THIS CALL: It executes the DB connection test.

// --- CRITICAL FIX 2: Remove redundant code ---
// Remove the repeated connectDB() call later in the file!
// Remove the explicit 'require("dotenv").config();' and 'const PORT = ...'
// Remove 'app.listen' section! It belongs in server.js.

// --- Middleware Setup ---
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const corsOptions = {
  origin: ALLOWED_ORIGIN,
  credentials: true,
};

// 0. Webhooks (Uses raw body parser from the route file)
app.use("/api/webhooks", webhookRoutes);

// 1. CORS Configuration
app.use(cors(corsOptions));

// 2. Middleware Setup (Standard JSON parser MUST RUN AFTER webhooks)
app.use(express.json()); // Body Parser

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/normalizer", normalizerRoutes);
app.use("/api/fulfillment", fulfillmentRoutes);

// --- Final Export (Must be the last line) ---
module.exports = app; // <--- The app instance is exported, not run.
