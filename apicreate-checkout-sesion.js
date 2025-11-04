
### File: api/create-checkout-session.js
```javascript
// Vercel serverless function (Node)
// Install stripe in package.json (server side uses same package here)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try{
    const { cart } = req.body;
    // Convert cart items to Stripe line items — prices are created on-the-fly using the "unit_amount" value.
    // For production, create persistent Prices in Stripe Dashboard and reference price IDs here instead.
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'npr',
        product_data: { name: item.title },
        unit_amount: Math.round(item.price) // in smallest currency unit — here assume price already in paisa; adjust if needed
      },
      quantity: item.qty
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.APP_URL || 'https://your-deploy-url.vercel.app'}/?checkout=success`,
      cancel_url: `${process.env.APP_URL || 'https://your-deploy-url.vercel.app'}/cart`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

