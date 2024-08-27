import React, { useState, useEffect } from 'react';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { fetchAllAccounts } from '../../../../services/CustomerServices';
import { useNavigate } from 'react-router-dom';

const DepositMoneyModal = ({ show, handleClose }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

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
        console.error('Error fetching accounts:', error);
      }
    };
    getAllAccounts();
  }, []);

  const handleDeposit = () => {
    if (selectedAccount && amount) {
      navigate(`/deposit-confirmation/${selectedAccount}/${amount}`);
      handleClose(); 
    } else {
      console.error('Please select an account and enter an amount.');
    }
  };

  return (
    <BootstrapModal show={show} onHide={handleClose} dialogClassName="custom-modal" backdropClassName="custom-backdrop">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Deposit Money</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
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
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeposit}>
          Deposit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default DepositMoneyModal;
