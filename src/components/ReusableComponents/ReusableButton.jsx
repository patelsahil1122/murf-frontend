import React from 'react';
import './ReusableButton.css'; // Assuming you have a CSS file for styling

const ReusableButton = ({ text, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`reusable-button ${className}`}
    >
      {text}
    </button>
  );
};

export default ReusableButton;