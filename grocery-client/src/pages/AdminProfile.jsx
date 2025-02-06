import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminProfile.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins');
        setAdminDetails(response.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowPopup(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (isLoading) {
    return <p>Loading admin details...</p>;
  }

  return (
    <div className="admin-profile">
      <h1>Admin Profile</h1>
      <div className="profile-info">
        <div className="profile-item">
          <label>Name:</label>
          <p>{adminDetails?.name || 'Not Available'}</p>
        </div>

        <div className="profile-item">
          <label>Email:</label>
          <p>{adminDetails?.email || 'Not Available'}</p>
        </div>

        <div className="profile-item">
          <label>Role:</label>
          <p>{adminDetails?.role || 'Admin'}</p>
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      {showPopup && (
        <div className="logout-popup">
          <p>You have been logged out successfully!</p>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
