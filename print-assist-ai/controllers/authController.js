// controllers/authController.js

/// <reference types="mongoose" /> // <--- ADD THIS LINE

const User = require("../models/User"); // Import the secure User Model
const generateToken = require("../utils/jwtUtils"); // <--- NEW IMPORT

// ----------------------------------------------------
// JSDoc Type Casting for VS Code / Type Checker
/** @type {mongoose.Model<import('../models/User').UserDocument>} */
const UserModel = User;
// ----------------------------------------------------

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // 2. Create a new User instance
    user = new User({
      email,
      password, // The pre-save hook in User.js will hash this automatically!
    });

    // 3. Save the user (triggers the hashing middleware)
    await user.save();

    // Success response
    // NOTE: We will send back a JWT Token here in the next step, but for now:
    res.status(201).json({
      msg: "User registered successfully (password hashed).",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  try {
    // 1. Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }

    // 2. Compare the provided password with the stored hash
    // This uses the comparePassword method defined in models/User.js
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }

    // 3. If match, generate and return JWT token
    const token = generateToken(user._id);

    res.json({
      token, // The JWT used for all future API calls
      user: {
        id: user._id,
        email: user.email,
        isSubscribed: user.subscriptionStatus === "active",
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// controllers/authController.js (Add this at the bottom)

// @route   GET /api/auth/profile
// @desc    Get user profile data (requires token)
// @access  Private
exports.getProfile = async (req, res) => {
  // req.user is available because of the 'protect' middleware!
  res.json(req.user);
};
