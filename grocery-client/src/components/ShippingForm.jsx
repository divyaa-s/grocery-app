import React, { useState } from 'react';
import '../styles/ShippingForm.css';

const ShippingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Shipping information submitted:', formData); // Debug log
    onSubmit(formData); // Pass data to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip Code"
        value={formData.zip}
        onChange={handleChange}
        required
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default ShippingForm;
