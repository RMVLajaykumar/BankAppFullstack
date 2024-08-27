import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyVerticallyCenteredModal from '../adminDashboard/adminComponents/addCustomer/MyVerticallyCenteredModal';
import AccountVerticalCenteredModal from '../adminDashboard/adminComponents/addAccount/AccountVerticalCenteredModal'; 
import { checkUserIDExists, addBankAccount } from '../../services/AdminServices'; 
import './AdminDashboard.css';
import { verifyAdmin } from '../../services/AuthServices';
import { successToast, errorToast } from '../utils/toast';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [accountModalShow, setAccountModalShow] = useState(false); 

  useEffect(() => {
    if (activeTab === 'viewCustomers') {
      navigate('/admin-dashboard/view-customers');
    } else if (activeTab === 'addCustomer') {
      setModalShow(true);
    } else if (activeTab === 'viewTransactions') {
      navigate('/admin-dashboard/view-transactions');
    } else if (activeTab === 'addBankAccount') {
      setAccountModalShow(true); 
    }
  }, [activeTab, navigate]);

  const handleUserIDSubmit = async (userID) => {
    try {
      const userExists = await checkUserIDExists(userID);
      if (userExists) {
        navigate(`/admin-dashboard/add-customer/${userID}`);
      } else {
        alert('User ID does not exist.');
      }
    } catch (error) {
      console.error('Error checking user ID:', error);
    } finally {
      setModalShow(false); 
    }
  };

  const handleAddBankAccount = async (customerId, bankId) => {
    try {
      const response = await addBankAccount(customerId, bankId); 
      if (response.success) {
        successToast('Account added successfully');
      } else {
        errorToast('Failed to add account');
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      errorToast('Failed to add account');
    } finally {
      setAccountModalShow(false); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/'); 
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
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
    <div className="admin-dashboard">
      {isAdmin && (
        <>
          <div className="logout-button-container">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <h1>Admin Dashboard</h1>
          <div className="tabs">
            <button
              className={activeTab === 'viewCustomers' ? 'active' : ''}
              onClick={() => setActiveTab('viewCustomers')}
            >
              View Customers
            </button>
            <button
              className={activeTab === 'addCustomer' ? 'active' : ''}
              onClick={() => setActiveTab('addCustomer')}
            >
              Add Customer
            </button>
            <button
              className={activeTab === 'addBankAccount' ? 'active' : ''}
              onClick={() => setActiveTab('addBankAccount')}
            >
              Add Bank Account
            </button>
            <button
              className={activeTab === 'viewTransactions' ? 'active' : ''}
              onClick={() => setActiveTab('viewTransactions')}
            >
              View Transactions
            </button>
          </div>
          <div className="tab-content">
          
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onSubmit={handleUserIDSubmit}
          />
          <AccountVerticalCenteredModal
            show={accountModalShow}
            onHide={() => setAccountModalShow(false)}
            onSubmit={handleAddBankAccount}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
