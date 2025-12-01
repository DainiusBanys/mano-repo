// models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Required for hashing

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    // This stores the HASHED password (never plain text)
    type: String,
    required: [true, "Password is required"],
  },
  stripeCustomerId: {
    // Links to Stripe customer object for billing
    type: String,
    required: false,
  },
  subscriptionStatus: {
    // 'trialing', 'active', 'canceled'
    type: String,
    default: "trialing",
  },
  isBetaTester: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// --- Mongoose Pre-Save Hook (Automated Hashing) ---
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // 1. Generate a Salt (a random string to make the hash unique)
    const salt = await bcrypt.genSalt(10);

    // 2. Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// --- Method for Password Comparison during Login (Week 2, Part 2) ---
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // Compares the provided plain-text password to the stored hash
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
