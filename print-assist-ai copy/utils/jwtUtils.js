// utils/jwtUtils.js

const jwt = require("jsonwebtoken");

// Load environment variables (to access JWT_SECRET)
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign(
    { id },
    jwtSecret,
    { expiresIn: "30d" } // Token expires in 30 days
  );
};

module.exports = generateToken;
