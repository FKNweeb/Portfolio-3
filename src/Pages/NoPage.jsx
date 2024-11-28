import React from 'react';
import './NoPage.css';

const NoPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a href="/" className="home-button">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NoPage;
