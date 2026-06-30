import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorState.css';

const ErrorState = ({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading the data. Please try again.', 
  onRetry 
}) => {
  return (
    <div className="error-container">
      <div className="error-card glass-panel">
        <div className="error-icon-circle">
          <AlertCircle size={32} />
        </div>
        <h2 className="error-title">{title}</h2>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary btn-retry">
            <RefreshCw size={16} className="retry-icon" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
