import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import ReusableButton from '../ReusableComponents/ReusableButton';
import ReusableNavLink from '../ReusableComponents/ReusableNavLink';
import ReusableFormCard from '../ReusableComponents/ReusableFormCard';
import ReusableInput from '../ReusableComponents/ReusableInput';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/login', {
        user_email: formData.email,
        password: formData.password,
      });

      if (response.data.data.token) {
        localStorage.setItem('userData', JSON.stringify({
          token: response.data.data.token,
          id: response.data.data._id,
          name: response.data.data.name,
          email: response.data.data.email,
        }));

        if (response.data.data.forumId.length > 0) {
          return navigate('/list-forum');
        }
        navigate('/create-forum', { replace: true });
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error.response?.data?.message || 'Login failed. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) loginUser();
  };

  const handleSignupClick = () => {
    localStorage.setItem('signupData', JSON.stringify({
      email: formData.email,
      timestamp: new Date().toISOString(),
    }));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form-container">
        <ReusableFormCard
          title="Welcome to murf"
          subtitle="Login to the platform and stay up to date with the current trend of the world!"
          titleClass="login-title"
          subtitleClass="login-subtitle"
          
        >
          <form onSubmit={handleSubmit}>
            {errors.general && <div className="general-error">{errors.general}</div>}

            <ReusableInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              className="form-input"
            />

            <ReusableInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              className="form-input"
            />

            <ReusableButton
              type="submit"
              className="login-button"
              onClick={handleSubmit}
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
        </ReusableFormCard>
        </div>
      </div>
    </div>
  );
}

export default Login;