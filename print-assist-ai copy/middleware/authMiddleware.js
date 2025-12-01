// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Used to fetch full user data if needed

// Load environment variables (to access JWT_SECRET)
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the header (Bearer Token format)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (Format: "Bearer [TOKEN]")
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // 3. Attach user data to the request (excluding the password hash)
      // This lets any subsequent controller access req.user._id
      req.user = await User.findById(decoded.id).select("-password");

      // Move to the next middleware or controller function
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Not authorized, token failed." });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token." });
  }
};

module.exports = { protect };
