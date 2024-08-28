import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../../utils/toast';
import { fetchAllAccounts } from '../../../../services/customerServices';

const AddTransactionModal = ({ show, handleClose }) => {
  const [senderAccount, setSenderAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [temp,setTemp]=useState(false);

  useEffect(() => {
    const getAllAccounts = async () => {
      try {
        const response = await fetchAllAccounts();
        const accountOptions = response.map((account) => ({
          value: account.accountNumber,
          label: account.accountNumber
        }));
        setOptions(accountOptions);
      } catch (error) {
        setTemp(true)
        const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        const errorType = error.errorType || "Error";
        errorToast(`Error ${statusCode}: ${errorType}` );
      }
    };
    getAllAccounts();
  }, []);

  const handleSubmit = () => {
    if (senderAccount && receiverAccount && amount) {
      navigate(`/user-dashboard/transaction-confirmation/${senderAccount}/${receiverAccount}/${amount}`);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      
        <Modal.Header closeButton>
        <Modal.Title>Create a New Transaction</Modal.Title>
      </Modal.Header>
      {!temp && (<>
      <Modal.Body>
        <Form.Group controlId="senderAccount">
          <Form.Label>Sender Account Number</Form.Label>
          <select
            id="senderAccount"
            className="form-control"
            value={senderAccount}
            onChange={(e) => setSenderAccount(e.target.value)}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Form.Group>
        <Form.Group controlId="receiverAccount" className="mt-3">
          <Form.Label>Receiver Account Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Receiver Account Number"
            value={receiverAccount}
            onChange={(e) => setReceiverAccount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="amount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              if (e.target.value < 0) {
                setError(true);
              } else {
                setError(false);
              }
              setAmount(e.target.value);
            }}
          />
        </Form.Group>
        {error && (
          <p style={{ color: 'red' }}>Amount should be positive</p>
        )}
      </Modal.Body>
      </>)
      }
      {temp && (
        <p style={{color:"red"}}>
             You have to create account to do transaction!!
        </p>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={error || temp}>
          Proceed
        </Button>
      </Modal.Footer>
      
    </Modal>
    
  );
};

export default AddTransactionModal;
