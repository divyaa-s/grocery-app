import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom'; // For navigation
import '../styles/Cart.css';
import OrderReview from '../components/OrderReview'; // Import OrderReview component

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]); // Clear the cart
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.img} // This uses the img property from your product data
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemoveFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Display the total price */}
          <div className="cart-total">
            <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
          </div>
          {/* Link to the checkout page */}
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
          {/* OrderReview component */}
          
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
