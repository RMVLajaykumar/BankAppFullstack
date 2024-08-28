import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';
import ViewPassbookModal from './userComponents/ViewPassbook/ViewPassbookModal'; 
import AddTransactionModal from './userComponents/addTransaction/AddTransactionModal';
import DepositModal from '../userDashboard/userComponents/deposiMoney/DepositMoneyModal'
import { verifyUser } from '../../services/authServices';
import { useEffect } from 'react';
const UserDashboard = () => {
  const[isUser,setIsUser]=useState();
  const [showPassbookModal, setShowPassbookModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false); 
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState();
  

  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("email");
    navigate('/');
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
  }, [navigate]);

  return (
    <div className="user-dashboard">
      {isUser && (
        <>
        <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h1 style={{ color: "#0056b3" }}>User Dashboard</h1>
      <div className="tabs">
        <button
          className="tab-button"
          onClick={() => setShowPassbookModal(true)}
        >
          View Passbook
        </button>
        <button
          className="tab-button"
          onClick={() => setShowTransactionModal(true)}
        >
          New Transaction
        </button>
        <button
          className="tab-button"
          onClick={() => navigate('/user-dashboard/update-profile')}
        >
          Update Profile
        </button>
        <button
          className="tab-button"
          onClick={() => setShowDepositModal(true)} 
        >
          Deposit Money
        </button>
      </div>

      <ViewPassbookModal
        show={showPassbookModal}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={() => setShowPassbookModal(false)}
      />

      <AddTransactionModal
        show={showTransactionModal}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={() => setShowTransactionModal(false)}
      />

      <DepositModal
        show={showDepositModal}
        handleClose={() => setShowDepositModal(false)}
      />
        </>
      )}
    </div>
  );
};

export default UserDashboard;
