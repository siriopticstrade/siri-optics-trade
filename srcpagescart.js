### File: src/pages/Cart.js
```javascript
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLISHABLE_PLACEHOLDER = 'pk_test_YOUR_PUBLISHABLE_KEY';

export default function Cart({ cart, removeFromCart, updateQty }){
  const subtotal = cart.reduce((s,p) => s + p.price * p.qty, 0);

  async function handleCheckout(){
    // Create a Checkout Session on the server
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ cart })
    });
    const data = await res.json();
    if(data.url){
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_PLACEHOLDER);
      // Redirect to checkout
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Failed to create checkout session');
    }
  }

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <div>{item.title}</div>
                <div>
                  <input type="number" min="1" value={item.qty} onChange={e => updateQty(item.id, parseInt(e.target.value||1))} />
                </div>
                <div>{item.currency} {item.price * item.qty}</div>
                <div><button onClick={() => removeFromCart(item.id)}>Remove</button></div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div>Subtotal: NPR {subtotal}</div>
            <button className="checkout" onClick={handleCheckout}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </section>
  );
}
```