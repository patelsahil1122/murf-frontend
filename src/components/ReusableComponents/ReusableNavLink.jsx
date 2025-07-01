import React from 'react';
import { NavLink } from 'react-router-dom';
import './ReusableButton.css'; // Assuming you have a CSS file for styling

const ReusableNavLink = ({ to, label, className = '', onClick }) => {
  return (
    <NavLink to={to} className={`reusable-navlink ${className}`} onClick={onClick}>
      {label}
    </NavLink>
  );
};

export default ReusableNavLink;