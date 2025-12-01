// config/config.js

const mongoose = require("mongoose");

// Load environment variables from .env file
require("dotenv").config();

const connectDB = async () => {
  try {
    // Mongoose connects using the MONGO_URI from the .env file
    // The MONGO_URI value should be: mongodb://db:27017/printassist_db
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established successfully.");
  } catch (error) {
    console.error("MongoDB connection FAILED:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
