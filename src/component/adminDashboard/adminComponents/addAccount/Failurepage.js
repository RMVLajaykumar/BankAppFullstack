
import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Failurepage.css';  

const FailurePage = () => {
  const navigate = useNavigate();  

  const handleBack = () => {
    navigate(-2);  
  };

  return (
    <div className="failure-page">
      <h1>Failure</h1>
      <p>Failed to add the account. Please try again.</p>
      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  );
};

export default FailurePage;
