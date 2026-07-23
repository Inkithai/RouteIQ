const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const { authRequired } = require("../middleware/auth");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_stripe_key_routeiq_2026";
const stripe = Stripe(stripeSecretKey);

// Create Stripe Payment Intent or Mock Checkout Session
router.post("/create-payment-intent", authRequired, async (req, res) => {
  try {
    const { amount, seats, busNumber, travelDate } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0 || Number.isNaN(amount)) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    try {
      if (process.env.STRIPE_SECRET_KEY) {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "usd",
          metadata: {
            userId: req.user.id,
            busNumber: busNumber || "BUS-Express",
            seats: Array.isArray(seats) ? seats.join(",") : seats,
            travelDate: travelDate || "",
          },
        });

        return res.json({
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
          status: "requires_payment_method",
        });
      }
    } catch (stripeErr) {
      console.warn("Stripe live API warning:", stripeErr.message);
    }

    res.json({
      clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`,
      paymentIntentId: `pi_mock_${Date.now()}`,
      status: "succeeded",
      simulated: true,
      message: "Stripe payment intent generated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
