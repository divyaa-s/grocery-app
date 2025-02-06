import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminHeader.css';

function AdminHeader() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/admin">Grocery Store</Link> {/* App name, linked to Admin Dashboard */}
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/admin">Home</Link></li> 
          <li><Link to="/admin/manage-products">Manage Products</Link></li>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
          <li><Link to="/admin/admin-profile">Profile</Link></li> {/* Logs out & redirects to login */}
        </ul>
      </nav>
    </header>
  );
}

export default AdminHeader;
