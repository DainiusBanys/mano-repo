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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes";
app.use("/api/auth", authRoutes);

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