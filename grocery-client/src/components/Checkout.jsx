import React, { useState, useContext } from 'react';
import ShippingForm from './ShippingForm';
import PaymentSelection from './PaymentSelection';
import OrderReview from './OrderReview';
import { CartContext } from '../CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const [step, setStep] = useState(1); // Manage checkout steps
  const { cart, setCart } = useContext(CartContext); // Access cart context
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});

  const handleShippingSubmit = (data) => {
    setShippingInfo(data);
    setStep(2); // Move to payment selection
  };

  const handlePaymentSubmit = (data) => {
    setPaymentInfo(data);
    setStep(3); // Move to order review
  };

  const handleOrderSubmit = () => {
    alert('Order placed successfully!');
    setCart([]); // Clear the cart after order completion
    setStep(4); // Show order confirmation
  };

  return (
    <div className="checkout">
      {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
      {step === 2 && <PaymentSelection onSubmit={handlePaymentSubmit} />}
      {step === 3 && (
        <OrderReview
          shippingInfo={shippingInfo}
          cart={cart}
          paymentInfo={paymentInfo}
          onSubmit={handleOrderSubmit}
          clearCart={() => setCart([])} // Clear the cart after confirming
        />
      )}
      {step === 4 && <div>Thank you for your purchase!</div>}
    </div>
  );
};

export default Checkout;
