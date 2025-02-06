import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Regular User Header
import AdminHeader from './components/AdminHeader'; // Admin Header
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Checkout from './components/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderReview from './components/OrderReview';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageProducts from './pages/ManageProducts';
import LoginHeader from './components/LoginHeader';
import AdminProfile from './pages/AdminProfile';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get current route

  // Show AdminHeader only on "/admin" and related admin routes
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname.startsWith('/login') || location.pathname === '/';;
  return (
    <div>
      {isLoginPage ? <LoginHeader /> : isAdminPage ? <AdminHeader /> : <Header />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderreview" element={<OrderReview />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/admin-profile" element={<AdminProfile/>} />
      </Routes>
    </div>
  );
}

export default App;
