import React, { useState } from 'react';
import '../styles/PaymentSelection.css'; // Import the CSS file

const PaymentSelection = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod }); // Send payment method to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Payment Method</h2>
      <div className="payment-container">
        <label className="payment-option">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal Logo"
            className="payment-logo"
          />
          <input
            type="radio"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={handleChange}
          />
          <span>PayPal</span>
        </label>
        <label className="payment-option">
          <img
            src="https://images.stripeassets.com/fzn2n1nzq965/6XFEUA9FzMBMphYdcUab19/37a1e07201366a351f7956560ccac09d/Stripe_wordmark_-_slate.svg?q=80&w=1082"
            alt="Stripe Logo"
            className="payment-logo"
          />
          <input
            type="radio"
            value="Stripe"
            checked={paymentMethod === 'Stripe'}
            onChange={handleChange}
          />
          <span>Stripe</span>
        </label>
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default PaymentSelection;
