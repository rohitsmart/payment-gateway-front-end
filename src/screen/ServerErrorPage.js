import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function ServerErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="server-error-page">
      <div className="error-container">
        <h1 className="error-title">500</h1>
        <p className="error-message">Something went wrong. Please try again later.</p>
        <Button color="primary" onClick={handleGoHome}>Go to Home</Button>
      </div>
    </div>
  );
}

export default ServerErrorPage;
