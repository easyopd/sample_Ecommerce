const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_live_m1KjRaIiXqwMu5', // Public Key (Test Mode)
  key_secret: 'z5qOvPaUz8hZOnfUnIOWJTsl' // Secret Key (Keep this secret and secure)
});

module.exports = async (req, res) => {
  // Set CORS headers to allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all domains, change if needed for security
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header
  
  // Handle preflight request (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      // Retrieve amount from the request body (from frontend)
      const { amount } = req.body;

      // Razorpay order creation options
      const options = {
        amount: amount * 100, // Amount in paisa (100 = ₹1)
        currency: 'INR',
        receipt: 'order_rcptid_11',
      };

      // Create order using Razorpay API
      const order = await razorpay.orders.create(options);

      // Send order ID back to the frontend
      res.status(200).json({ orderId: order.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  } else {
    // Handle method other than POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
