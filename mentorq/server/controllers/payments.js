const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stripe = require('../utils/stripe');

// @desc    Get all subscription plans
// @route   GET /api/payments/plans
// @access  Public
exports.getPlans = asyncHandler(async (req, res, next) => {
  const plans = await stripe.getPlans();
  
  res.status(200).json({
    success: true,
    data: plans
  });
});

// @desc    Create subscription
// @route   POST /api/payments/subscribe
// @access  Private
exports.createSubscription = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  
  const { paymentMethodId, priceId } = req.body;
  
  const subscription = await stripe.createSubscription(
    user.stripeCustomerId,
    paymentMethodId,
    priceId
  );
  
  // Update user subscription
  user.subscription = {
    plan: priceId.includes('basic') ? 'basic' : 
          priceId.includes('premium') ? 'premium' : 'elite',
    subscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    isActive: true
  };
  
  await user.save();
  
  res.status(200).json({
    success: true,
    data: {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      plan: user.subscription.plan
    }
  });
});

// @desc    Cancel subscription
// @route   POST /api/payments/cancel
// @access  Private
exports.cancelSubscription = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user || !user.subscription.subscriptionId) {
    return next(new ErrorResponse('No active subscription found', 400));
  }
  
  await stripe.cancelSubscription(user.subscription.subscriptionId);
  
  // Update user subscription
  user.subscription = {
    plan: null,
    subscriptionId: null,
    status: 'canceled',
    currentPeriodEnd: null,
    isActive: false
  };
  
  await user.save();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});