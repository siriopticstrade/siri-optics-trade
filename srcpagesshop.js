
### File: src/pages/Shop.js
```javascript
import React from 'react';
import products from '../data/products';

export default function Shop({ addToCart }){
  return (
    <section className="shop">
      <h2>Shop</h2>
      <div className="grid">
        {products.map(p => (
          <article className="card" key={p.id}>
            <div className="card-media">Image Placeholder</div>
            <h3>{p.title}</h3>
            <p className="price">{p.currency} {p.price}</p>
            <p className="desc">{p.description}</p>
            <button onClick={() => addToCart(p)}>Add to cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}
```