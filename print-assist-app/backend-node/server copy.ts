import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/config";
// Import models to ensure they register with Sequelize
import "./models/User";

dotenv.config();

const app = express();

// FIX: Convert process.env.PORT to a number explicitly to satisfy TypeScript
const PORT: number = Number(process.env.PORT) || 5000;

// Routes
// --- 1. Use require for routes to ensure the Router object is captured correctly ---
const authRoutes = require("./routes/authRoutes").default || require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes").default || require("./routes/subscriptionRoutes");
const webhookRoutes = require("./routes/webhookRoutes").default || require("./routes/webhookRoutes");

// Middleware
app.use(cors());

// 1. MUST BE FIRST: Webhook routes (Raw body)
app.use("/api/webhooks", webhookRoutes);

app.use(express.json());


// 3. REST OF ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);

// --- 4. Add this Debugger to see exactly what Express is seeing ---
console.log("Mounting Auth Routes on /api/auth");

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ force: false });

    // Listen on 0.0.0.0 to ensure Docker mapping works
    // Now PORT is guaranteed to be a number
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running and listening on port ${PORT}`);
    });

  } catch (error: any) {
    console.error("❌ Unable to connect to the database:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

startServer();