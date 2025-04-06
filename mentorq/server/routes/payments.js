const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST api/payments/create-subscription
// @desc    Create a subscription
// @access  Private
router.post('/create-subscription', auth, async (req, res) => {
  try {
    const { plan, paymentMethodId } = req.body;
    
    // Get user
    const user = await User.findById(req.user.id);
    
    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });
    
    // Update default payment method
    await stripe.customers.update(
      user.stripeCustomerId,
      {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      }
    );
    
    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: getPriceId(plan) }],
      expand: ['latest_invoice.payment_intent'],
    });
    
    // Update user in database
    user.subscription = {
      plan,
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    };
    
    await user.save();
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      plan
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Helper function to get Stripe price ID based on plan
function getPriceId(plan) {
  const prices = {
    basic: process.env.STRIPE_BASIC_PRICE_ID,
    premium: process.env.STRIPE_PREMIUM_PRICE_ID,
    elite: process.env.STRIPE_ELITE_PRICE_ID
  };
  
  return prices[plan];
}

module.exports = router;