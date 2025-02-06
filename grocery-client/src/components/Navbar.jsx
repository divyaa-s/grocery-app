import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <h1>Grocery App</h1>
      <ul>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/home">Home</Link></li> 
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
