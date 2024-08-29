import React, { useState, useEffect } from 'react';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { fetchAllAccounts } from '../../../../services/customerServices';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../../utils/toast';
import { ToastContainer } from 'react-toastify';

const DepositMoneyModal = ({ show, handleClose }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const [temp,setTemp]=useState(false);
  const[error,setError]=useState(false);

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const response = await fetchAllAccounts();
        
        if (response ) {
          const accountOptions = response.map((account) => ({
            value: account.accountNumber, 
            label: account.accountNumber 
          }));
          setAccounts(accountOptions);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        setError(true)
        const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        const errorType = error.errorType || "Error";
        errorToast(`Error ${statusCode}: ${errorType}` );
      }
    };
    getAllAccounts();
  }, []);

  const handleDeposit = () => {
    if (selectedAccount && amount) {
      navigate(`/deposit-confirmation/${selectedAccount}/${amount}`);
      handleClose(); 
    }  else{
      alert('Please select account and and enter amount.');
    }
  };

  return (
    <BootstrapModal show={show} onHide={handleClose} dialogClassName="custom-modal" backdropClassName="custom-backdrop">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Deposit Money</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {!error && (<>
          <Form>
          <Form.Group controlId="formAccount">
            <Form.Label>Select Account</Form.Label>
            <Form.Control
              as="select"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">Select an account</option>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <option key={account.value} value={account.value}>
                    {account.label}
                  </option>
                ))
              ) : (
                <option value="">No accounts available</option>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
            required
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                if (e.target.value <= 0 || e.target.value<500 ) {
                  setTemp(true);
                } 
                else {
                  setTemp(false);
                }
                setAmount(e.target.value);
              }}
            />
          </Form.Group>
          {temp && (
          <p style={{ color: 'red' }}>Amount should be positive and minimum of 500</p>
        )}

        </Form>
        </>)}
        {error && (
          <p style={{color:"red"}}>
            You dont have account to depositMoney!
          </p>
        )}
        
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeposit} disabled={error || temp}>
          Deposit
        </Button>
      </BootstrapModal.Footer>
      <ToastContainer/>
    </BootstrapModal>
  );
};

export default DepositMoneyModal;
