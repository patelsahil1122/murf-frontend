import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import ReusableButton from '../ReusableComponents/ReusableButton';
import ReusableNavLink from '../ReusableComponents/ReusableNavLink';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '' // Added general error field
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const loginUser = async () => {
         // Prevent default form submission behavior
    
    try {
      setLoading(true);
      console.log('Login attempt with:', { email: formData.email }); 

      const response = await axios.post('http://localhost:5000/login', {
        user_email: formData.email,
        password: formData.password
      }, {
        
      });

      console.log('Login response:', response.data.data); // Debug log

      // Adjust this   according to your backend response structure
      if (response.data.data.token) {
        console.log(response.data.data.forumId.length > 0 );

        

         localStorage.setItem('userData', JSON.stringify({
          token: response.data.data.token,
          id: response.data.data._id,
          name: response.data.data.name,
          email: response.data.data.email,

        }));

        if (response.data.data.forumId.length > 0) {
          // User has an existing forum, redirect to the forum page
         return navigate('/list-forum');

        }

        navigate('/create-forum', { replace: true });
      }
    } 
    catch (error) {
      console.error('Login Error:', error?.response || error.message);
      setErrors(prev => ({
        ...prev,
        general: error.response?.data?.message || 'Login failed. Please try again.'
      }));

    }
    finally {
      setLoading(false);
      
    }
  };  

 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    loginUser();
  
  }

  const handleSignupClick = () => {
    // Store initial form data in localStorage
    localStorage.setItem('signupData', JSON.stringify({
      email: formData.email,
      timestamp: new Date().toISOString()
    }));
    navigate('/signup');
  };  

  const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };


 
  return (
    
   
  <div className="login-page">
    <div className="login-card">
      <div className="login-form-container">
        <h1 className="login-title">Welcome to murf</h1>
        <p className="login-subtitle">
          Login to the platform and stay up to date with 
          <br />the current trend of the world!
        </p>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'error-input' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) setErrors({ ...errors, email: '' })
              }}
            />
            {errors.email && <span className="input-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-input ${errors.password ? 'error-input' : ''}`}
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
            />
            {errors.password && <span className="input-error">{errors.password}</span>}
          </div>

          <ReusableButton
           type="submit"
           onClick={handleSubmit}
           className="login-button"
           disabled={loading}
           text={loading ? 'Logging in...' : 'Login'}
            />
        </form>

        <p className="signup-text">
          Do not have an account?{' '}
          <ReusableNavLink
             to="/signup"
             className="signup-link"
             label="Sign Up"
             onClick={handleSignupClick}
          />
        </p>
      </div>
    </div>
  </div>
)
}

export default Login

