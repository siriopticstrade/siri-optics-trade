
### File: src/pages/Home.js
```javascript
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>Siri Optics Trade</h1>
        <p>Classic. Elegant. Vision for life.</p>
        <Link className="cta" to="/shop">Shop Now</Link>
      </div>
    </section>
  );
}
```