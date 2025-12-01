// config/stripe.js

const stripe = require("stripe");
require("dotenv").config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeClient;
