// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User").default; // Used to fetch full user data if needed

// --- JSDoc Type Definition for Custom Payload ---
/**
 * @typedef {object} CustomJwtPayload
 * @property {string} id
 */

// Load environment variables (to access JWT_SECRET)
require("dotenv").config();
const jwtSecret =
  process.env.JWT_SECRET || "V,#4c*8mLZr9Q;rL{i2y!+{J-VaSf5+Kr($";

// middleware/authMiddleware.js

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // --- THE BULLETPROOF CHECK ---
      // This looks for 'id' inside 'user' (nested) OR 'id' at the top level (flat)
      const userId =
        decoded.user && decoded.user.id ? decoded.user.id : decoded.id;

      if (!userId) {
        console.error("❌ Token structure mismatch. Decoded payload:", decoded);
        return res
          .status(401)
          .json({ msg: "Not authorized, missing ID in token payload." });
      }

      // Find the user in PostgreSQL
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(401).json({ msg: "Not authorized, user not found." });
      }

      req.user = user; // Attach the full user object to the request
      next();
    } catch (error) {
      console.error("❌ JWT Verification Error:", error.message);
      res.status(401).json({ msg: "Not authorized, token failed." });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token." });
  }
};
module.exports = { protect };
