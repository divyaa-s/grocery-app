import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserDetails({
          name: parsedUser.name || 'No Name',
          email: parsedUser.email || 'No Email',
          address: parsedUser.address || 'Not provided',
        });
        setEditedDetails({
          name: parsedUser.name || 'No Name',
          email: parsedUser.email || 'No Email',
          address: parsedUser.address || 'Not provided',
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    } else {
      console.warn("No user data found in localStorage.");
    }
  
    setIsLoading(false);
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDetails(userDetails);
  };

  const handleSaveClick = () => {
    setUserDetails(editedDetails);
    localStorage.setItem('user', JSON.stringify(editedDetails)); // Update local storage
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowPopup(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>

      <div className="profile-info">
        <div className="profile-item">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedDetails.name}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userDetails.name}</p>
          )}
        </div>

        <div className="profile-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userDetails.email}</p>
          )}
        </div>

        <div className="profile-item">
          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedDetails.address}
              onChange={handleInputChange}
            />
          ) : (
            <p>{userDetails.address}</p>
          )}
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={handleEditClick}>
            Edit
          </button>
        )}
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

export default UserProfile;
