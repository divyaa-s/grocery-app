import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Apple', price: 0.5, image: '/images/apple.jpg' },
  { id: 2, name: 'Banana', price: 0.3, image: '/images/banana.jpg' },
];

function Home() {
  return (
    <div>
      <h2>Welcome to the Grocery Store</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
