import React from 'react';

function ReusableInput({ label, type = 'text', value, onChange, className = '', error }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className={`${className} ${error ? 'error-input' : ''}`}
        value={value}
        onChange={onChange}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}

export default ReusableInput;