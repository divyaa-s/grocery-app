import React from 'react';
import '../styles/OrderReview.css';

const OrderReview = ({ shippingInfo, cart, paymentInfo, onSubmit, clearCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleConfirm = () => {
    // You can perform any additional actions for the order submission here
    clearCart(); // This will clear the cart after confirming
    onSubmit();  // Proceed with the payment process
  };

  return (
    <div className="order-review">
      <h2>Order Review</h2>
      <div>
        <h3>Shipping Information</h3>
        <p>Name: {shippingInfo.name}</p>
        <p>Address: {shippingInfo.address}</p>
        <p>City: {shippingInfo.city}</p>
        <p>Zip: {shippingInfo.zip}</p>
      </div>
      <div>
        <h3>Payment Method</h3>
        <p>{paymentInfo.paymentMethod}</p>
      </div>
      <div>
        <h3>Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
        <p>Total: ₹{totalPrice.toFixed(2)}</p>
      </div>
      <button onClick={handleConfirm}>Confirm and Pay</button>
    </div>
  );
};

export default OrderReview;
