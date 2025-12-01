// app.js (UPDATED FILE)

const express = require("express");
const connectDB = require("./config/config");
const app = express();
const authRoutes = require("./routes/authRoutes"); // <--- ADD THIS LINE
const mongoose = require("mongoose");
const webhookRoutes = require("./routes/webhookRoutes"); // <--- NEW IMPORT
const subscriptionRoutes = require("./routes/subscriptionRoutes"); // <--- NEW IMPORT

// Load environment variables
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// API Routes
// ----------------------------------------------------
// 1. WEBHOOKS MUST BE HERE (Uses raw body parser from the route file)
app.use("/api/webhooks", webhookRoutes); // <--- ADD THIS LINE

// 2. MIDDLEWARE Setup (Standard JSON parser MUST RUN AFTER webhooks)
app.use(express.json()); // Body Parser

// Database Connection
// ----------------------------------------------------
connectDB();

// API Routes (NEW SECTION)
// ----------------------------------------------------
// All requests starting with /api/auth will be handled by authRoutes.js
app.use("/api/auth", authRoutes); // <--- ADD THIS LINE
app.use("/api/subscribe", subscriptionRoutes); // <--- NEW ROUTE MIDDLEWARE

// Root Route (Sanity Check)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "PrintAssist AI API is running!",
    dbStatus:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Start Server
// ----------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
