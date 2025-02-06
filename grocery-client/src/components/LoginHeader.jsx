import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/LoginHeader.css';

function LoginHeader() {
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Grocery Store</Link>
      </div>

    </header>
  );
}

export default LoginHeader;
