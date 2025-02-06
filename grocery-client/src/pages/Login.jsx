import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      
      const data = response.data;

      console.log('Login response:', data);  // Add this line to debug the API response


      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        name: data.user.name,  // Store name
        email: data.user.email,
        address: data.user.address || 'Not provided',  // If available
        isAdmin: data.user.isAdmin || false,  // Ensure isAdmin is included

      }));      


      if (response.status === 200) {
        // Store token in localStorage
        // Redirect based on user type
        if (data.user.isAdmin) {
          navigate('/admin');  // Navigate to admin dashboard
        } else {
          navigate('/home');  // Navigate to user home
        }
      } else {
        setErrorMessage('Incorrect credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="form-group">
        <h4>
          New user? <Link to="/register">Register</Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
