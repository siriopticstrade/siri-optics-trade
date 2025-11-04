
### File: src/App.js
```javascript
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App(){
  const [cart, setCart] = useState([]);

  function addToCart(product){
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if(found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id){
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function updateQty(id, qty){
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));
  }

  return (
    <div className="site">
      <header className="header">
        <div className="brand"><Link to="/">Siri Optics Trade</Link></div>
        <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart ({cart.reduce((s,p)=>s+p.qty,0)})</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Siri Optics Trade</div>
        <div>Classic • Elegant • Professional</div>
      </footer>
    </div>
  );
}
```