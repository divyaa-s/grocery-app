import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Grocery Store</Link>
      </div>
      <nav>
        <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>           
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">
            <div className="cart-icon">
              🛒
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>
          </Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
