import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalAmount, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // Call your backend to complete the payment
      const response = await fetch('/payment', {
        method: 'POST',
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalAmount * 100, // Convert to cents
        }),
      });

      const paymentResult = await response.json();
      if (paymentResult.success) {
        onSuccess();
      } else {
        alert('Payment failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Details</h2>
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>
        Pay ${totalAmount.toFixed(2)}
      </button>
    </form>
  );
};

export default PaymentForm;
