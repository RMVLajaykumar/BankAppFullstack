
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Confirmation.css';
import { addBankAccount } from '../../../../services/adminServices';
import { successToast,errorToast } from '../../../utils/toast';

import { verifyAdmin } from '../../../../services/authServices';
import { ToastContainer } from 'react-toastify';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const[isAdmin,setIsAdmin]=useState();
  const { customerId, bankId } = useParams(); 

  const handleConfirm = async () => {
    try {
      
      await addBankAccount(customerId, bankId);
    //   successToast("Account added successfully")
       navigate('/success'); 
    } 
      catch (error) {
        const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        const errorType = error.errorType || "Error";
        errorToast(`Error ${statusCode}: ${errorType}` );
        setTimeout(()=>{
          navigate('/failure');
        },2000);
       
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };
  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      console.log("Response",response)
      if (!response) {
        navigate('/');
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="confirmation-page">
      {isAdmin && (
        <>
        <h1>Confirm Details</h1>
      <p><strong>Customer ID:</strong> {customerId}</p>
      <p><strong>Bank ID:</strong> {bankId}</p>
      <button onClick={handleConfirm} className="confirm-button">Confirm</button>
      <button onClick={handleCancel} className="cancel-button">Cancel</button>
       <ToastContainer/>
        </>
      )}
    </div>
  );
};

export default ConfirmationPage;
