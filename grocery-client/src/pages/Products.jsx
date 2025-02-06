import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from '../CartContext';

import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch products from the database
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    // Assuming you are using CartContext or similar to add items to the cart
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="home-container">
      <h1>Products</h1>
      <div className="home-grid">
        {products.map((product) => (
          <div key={product._id} className="home-item">
            {/* Ensure the image path is correctly used */}
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price} per kg</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {showPopup && <div className="popup">Product added to cart!</div>}
    </div>
  );
}

export default Products;
