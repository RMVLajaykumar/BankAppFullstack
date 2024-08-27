import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { performTransaction } from '../../../../services/CustomerServices';
import { successToast, errorToast } from '../../../utils/toast';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './TransactionConfirmation.css'
import { verifyUser } from '../../../../services/AuthServices';
import { useEffect } from 'react';

const TransactionConfirmation = () => {
  const { senderAccount, receiverAccount, amount } = useParams();
  const navigate = useNavigate();
  const[isUser,setIsUser]=useState();

  const handleConfirm = async () => {
    try {
      await performTransaction(senderAccount, receiverAccount, amount);
      successToast('Transaction successful!');
      setTimeout(() => {
        navigate(`/user-dashboard/${localStorage.getItem("id")}`);
      }, 1000);
    } catch (error) {
      errorToast('Transaction failed.');
    }
  };

  const handleCancel = () => {
    navigate(`/user-dashboard/${localStorage.getItem("id")}`);
  };
  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      if (!response) {
        navigate('/');
        return;
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate])
  

  return (
    <div className="transaction-confirmation">
     {isUser && (
      <>
       <h2>Transaction Confirmation</h2>
      <p><strong>Sender Account:</strong> {senderAccount}</p>
      <p><strong>Receiver Account:</strong> {receiverAccount}</p>
      <p><strong>Amount:</strong> {amount}</p>
      <div className="buttons">
        <Button variant="success" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      <ToastContainer />
      </>
     )}
    </div>
  );
};

export default TransactionConfirmation;
