
import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Successpage.css';  

const SuccessPage = () => {
  const navigate = useNavigate();  

  const handleBack = () => {
    navigate(-2);  
  };

  return (
    <div className="success-page">
      <h1>Success</h1>
      <p>Account added successfully!</p>
      <button onClick={handleBack} className="back-button">Back</button>
    </div>
  );
};

export default SuccessPage;
