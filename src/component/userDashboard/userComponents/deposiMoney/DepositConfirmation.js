import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { depositMoney } from '../../../../services/CustomerServices';
import { successToast, errorToast } from '../../../utils/toast';
import { Button } from 'react-bootstrap';
import './DepositConfirmation.css'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { verifyUser } from '../../../../services/AuthServices';

const DepositConfirmation = () => {
  const { accountNumber, amount } = useParams();
  const navigate = useNavigate();
  const [isUser,setIsUser]=useState();

  const handleConfirm = async () => {
    try {
      await depositMoney(accountNumber, amount);
      successToast('Deposit successful!');
      setTimeout(() => {
        navigate(`/user-dashboard/${localStorage.getItem("id")}`);
      }, 1000);
    } catch (error) {
      errorToast('Deposit failed.');
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
       <h2>Deposit Confirmation</h2>
      <p><strong>Account Number:</strong> {accountNumber}</p>
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

export default DepositConfirmation;
