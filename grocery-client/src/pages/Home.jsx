import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Grocery Store</h2>
      <p>Discover fresh groceries at the best prices!</p>
      <h1>Featured Products</h1>
      <div className="home-grid">
        <div className="home-item">
          <img src="assets\ProductImages\apple.jpeg" alt="Product 1" />
          <h3>Fresh Apples</h3>
          <p>Only ₹200 per kg</p>
          <button>Add to Cart</button>
        </div>
        <div className="home-item">
          <img src="assets\ProductImages\banana.jpeg" alt="Product 2" />
          <h3>Organic Bananas</h3>
          <p>Only ₹130 per kg</p>
          <button>Add to Cart</button>
        </div>
      </div>
      <h3> Click here for more <Link to="/products">products</Link></h3>
    </div>
  );
}

export default Home;
