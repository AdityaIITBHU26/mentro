const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create subscription
exports.createSubscription = async (customerId, paymentMethodId, priceId) => {
  try {
    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    
    // Update default payment method
    await stripe.customers.update(
      customerId,
      {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      }
    );
    
    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
    
    return subscription;
  } catch (err) {
    console.error('Stripe Error:', err);
    throw err;
  }
};

// Get all plans
exports.getPlans = async () => {
  try {
    const plans = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    });
    
    return plans.data.map(plan => ({
      id: plan.id,
      name: plan.product.name,
      price: plan.unit_amount / 100,
      currency: plan.currency,
      interval: plan.recurring.interval,
      features: plan.product.metadata.features ? 
        JSON.parse(plan.product.metadata.features) : []
    }));
  } catch (err) {
    console.error('Stripe Error:', err);
    throw err;
  }
};

// Cancel subscription
exports.cancelSubscription = async (subscriptionId) => {
  try {
    const deleted = await stripe.subscriptions.del(subscriptionId);
    return deleted;
  } catch (err) {
    console.error('Stripe Error:', err);
    throw err;
  }
};