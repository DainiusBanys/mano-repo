// server.ts
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/config";
import "./models/User";
const app = require("./app"); // This app already has all routes defined

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: false });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error: any) {
    process.exit(1);
  }
};
startServer();