import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Details for Item {id}</h2>
      <p>More information coming soon...</p>
    </div>
  );
}

export default ProductDetails;
