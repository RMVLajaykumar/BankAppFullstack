import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTransactionModal = ({ show, onHide }) => {
  const [senderAccount, setSenderAccount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (senderAccount && receiverAccount && amount) {
      navigate(`/user-dashboard/transaction-confirmation/${senderAccount}/${receiverAccount}/${amount}`);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="senderAccount">
          <Form.Label>Sender Account Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Sender Account Number"
            value={senderAccount}
            onChange={(e) => setSenderAccount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="receiverAccount" className="mt-3">
          <Form.Label>Receiver Account Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Receiver Account Number"
            value={receiverAccount}
            onChange={(e) => setReceiverAccount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="amount" className="mt-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal;
