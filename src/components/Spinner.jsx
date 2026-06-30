import React from 'react';
import './Spinner.css';

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <div className="custom-spinner"></div>
        <p className="spinner-message">{message}</p>
      </div>
    </div>
  );
};

export default Spinner;
