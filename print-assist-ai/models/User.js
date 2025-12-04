// models/User.js (FINAL, CORRECTED VERSION)

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// ----------------------------------------------------
// JSDoc Type Definition for VS Code / Type Checker
// ----------------------------------------------------

/**
 * @typedef {object} UserSchemaFields
 * @property {string} email
 * @property {string} password   // <-- FIX 1: Explicitly include the password field
 * @property {string} subscriptionStatus
 * @property {boolean} isBetaTester
 * @property {string | undefined} stripeCustomerId
 * @property {Date} createdAt
 */

/**
 * @typedef {object} UserMethods
 * @property {function(string): Promise<boolean>} comparePassword - Checks if the given password matches the stored hash.
 */

/**
 * @typedef {mongoose.Document & UserSchemaFields & UserMethods} UserDocument // <-- Combine Schema Fields and Methods
 */

/** @type {mongoose.Schema<UserDocument>} */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "trialing", "canceled"],
    default: "trialing",
  },
  isBetaTester: {
    type: Boolean,
    default: false,
  },
  stripeCustomerId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ----------------------------------------------------
// MIDDLEWARE: Hashing Password Before Save
// ----------------------------------------------------

// Define the 'this' context as UserDocument inside the function for type checking
/** @type {function(function): void} */
const preSaveHook = function (next) {
  /** @type {UserDocument} */
  const user = this; // Explicitly casting 'this' as UserDocument

  // Check if the password field has been modified or if the user is new
  if (!user.isModified("password")) {
    // Fix 2: 'isModified' is now recognized via UserDocument cast
    return next();
  }

  // Generate Salt and Hash Password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash; // Fix 3: 'password' is now recognized via UserDocument cast
      next();
    });
  });
};

userSchema.pre("save", preSaveHook); // Fix 1: 'pre' is now recognized because userSchema is typed above

// ----------------------------------------------------
// METHODS: Password Comparison
// ----------------------------------------------------

/**
 * @this {UserDocument}
 * @param {string} candidatePassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    // Use the instance's password (this.password) for comparison
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

// ----------------------------------------------------
// MODEL EXPORT
// ----------------------------------------------------

// Use JSDoc to inform the export type
/** @type {mongoose.Model<UserDocument>} */
const User = mongoose.model("User", userSchema);

module.exports = User;
