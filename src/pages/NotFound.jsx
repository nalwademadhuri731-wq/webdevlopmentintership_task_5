import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-card glass-panel animate-scale-in">
          {/* Animated Graphic */}
          <div className="graphic-wrapper">
            <div className="planet-sphere">
              <div className="planet-ring"></div>
            </div>
            <h1 className="error-code">404</h1>
          </div>

          <h2 className="error-message-title">Page Not Found</h2>
          <p className="error-description">
            Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn btn-secondary">
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
