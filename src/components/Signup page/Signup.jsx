import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [shouldSignup, setShouldSignup] = useState(false)
  const navigate = useNavigate()

  // Update the useEffect hook with signup logic
  
    const signupUser = async () => {
      if (!shouldSignup) return;

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/sign-up', {
          user_name: formData.name,
          user_email: formData.email,
          password: formData.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Signup successful:', response.data);

        if (response.data) {
          
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify({
            name: formData.name,
            email: formData.email,
            signupDate: new Date().toISOString()
          }));

          
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          
          // Navigate to create-forum page after succexssful signup
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Signup failed:', error?.response?.data || error.message);
        setErrors({
          ...errors,
          general: error.response?.data?.message || 'Signup failed. Please try again.'
        });
      } finally {
        setLoading(false);
        setShouldSignup(false);
      }
    };

  

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)

    // If there are no errors, proceed with signup
    if (Object.keys(newErrors).length === 0) {
      setShouldSignup(true)
    }
  }

  return (
    <div className="signup-card">
      <div className="signup-form-container">
        <h1 className="signup-title">Welcome to murf</h1>
        
        <p className="signup-subtitle">
          Sign up into the platform and write some exciting posts to attract users
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'error-input' : ''}`}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
            />
            {errors.name && (
              <span className="input-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

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
            {errors.email && (
              <span className="input-error" role="alert">
                {errors.email}
              </span>
            )}
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
            {errors.password && (
              <span className="input-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="signup-button" 
            onClick={signupUser} 
            disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <NavLink to="/" className="login-link">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Signup

