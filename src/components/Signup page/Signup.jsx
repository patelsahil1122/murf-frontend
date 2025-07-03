import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import ReusableButton from '../ReusableComponents/ReusableButton';
import ReusableNavLink from '../ReusableComponents/ReusableNavLink';
import ReusableFormCard from '../ReusableComponents/ReusableFormCard';
import ReusableInput from '../ReusableComponents/ReusableInput';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);
  const [shouldSignup, setShouldSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const signupUser = async () => {
      if (!shouldSignup) return;
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/sign-up', {
          user_name: formData.name,
          user_email: formData.email,
          password: formData.password
        });

        if (response.data) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify({
            name: formData.name,
            email: formData.email,
            signupDate: new Date().toISOString(),
          }));
          navigate('/', { replace: true });
        }
      } catch (error) {
        setErrors({
          ...errors,
          general: error.response?.data?.message || 'Signup failed. Please try again.'
        });
      } finally {
        setLoading(false);
        setShouldSignup(false);
      }
    };

    signupUser();
  }, [shouldSignup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setShouldSignup(true);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-form-container">

        <ReusableFormCard
          title="Welcome to murf"
          subtitle="Sign up into the platform and write some exciting posts to attract users"
          titleClass="signup-title"
          subtitleClass="signup-subtitle"
        >
          <form onSubmit={handleSubmit}>
            {errors.general && <div className="general-error">{errors.general}</div>}

            <ReusableInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              className="form-input"
            />

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
              onClick={() => {}}
              className="signup-button"
              disabled={loading}
              text={loading ? 'Signing up...' : 'Sign up'}
            />
          </form>

          <p className="login-text">
            Already have an account?{' '}
            <ReusableNavLink
              to="/"
              className="login-link"
              label="Login"
            />
          </p>
        </ReusableFormCard>
        </div>
      </div>
    </div>
  );
}

export default Signup;
