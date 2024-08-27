import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  
import { addBankAccount } from '../../../../services/AdminServices';

const AccountVerticalCenteredModal = ({ show, onHide }) => {
  const [customerId, setCustomerId] = useState('');
  const [bankId, setBankId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (customerId && bankId) {
      navigate(`/add-account/confirmation/${customerId}/${bankId}`);
    } else {
      alert('Please enter both Customer ID and Bank ID');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Customer ID and Bank ID
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter Bank ID"
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountVerticalCenteredModal;
