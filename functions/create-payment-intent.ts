// [domain]/.netlify/functions/create-payment-intent

require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

/**
 * Validate and calculate total order amount
 * @param {Array} cart - Array of cart items
 * @returns {number} Total amount in THB cents
 */
const calculateOrderAmount = (cart) => {
  // Validate cart structure
  if (!Array.isArray(cart)) {
    throw new Error('Invalid cart format');
  }

  return cart.reduce((total, item) => {
    // Validate item structure
    if (!item._id || typeof item.amount !== 'number' || typeof item.price !== 'number') {
      throw new Error('Invalid cart item structure');
    }
    
    // Calculate total with fixed decimal to avoid floating point issues
    const itemTotal = Number((item.amount * item.price).toFixed(2));
    return total + itemTotal;
  }, 0) * 100; // Convert to cents for Stripe
};

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    // Validate Stripe secret key
    if (!process.env.REACT_APP_STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key missing');
    }

    // Handle POST request
    if (event.httpMethod === 'POST') {
      const { cart } = JSON.parse(event.body);
      
      if (!cart || !cart.length) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Cart is empty' }),
        };
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(cart),
        currency: 'thb',
        automatic_payment_methods: { enabled: true },
        metadata: {  // Add useful metadata
          item_count: cart.length,
          user_agent: event.headers['user-agent']
        },
      });

      // Log successful intent creation (avoid logging sensitive data)
      if (process.env.NODE_ENV !== 'production') {
        console.log('PaymentIntent created:', paymentIntent.id);
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        }),
      };
    }

    // Handle unsupported methods
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Payment processing error:', error);
    
    return {
      statusCode: error.statusCode || 500,
      headers,
      body: JSON.stringify({
        error: {
          message: error.message,
          type: error.type || 'api_error'
        }
      }),
    };
  }
};