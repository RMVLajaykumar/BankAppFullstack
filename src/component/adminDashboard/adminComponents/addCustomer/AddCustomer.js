import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addCustomer } from '../../../../services/AdminServices';
import './AddCustomer.css';
import { successToast, errorToast } from "../../../utils/toast";
import { ToastContainer } from 'react-toastify';
import { verifyAdmin } from '../../../../services/AuthServices';
import { useEffect } from 'react';
const AddCustomer = () => {
  const [isAdmin,setIsAdmin]=useState();
  const navigate = useNavigate();
  const { userID } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addCustomer(userID, firstName, lastName);
      console.log('Customer added successfully:', result);
      successToast("Added successfully");
    } catch (error) {
      console.error('Error while adding customer:', error);
      errorToast("Failed to add customer");
    }
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
    <div className="add-customer-form">
      {isAdmin && (
        <>
        <h1>Add Customers</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="add-button">Add Customer</button>
          <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
      <ToastContainer />
        </>
      )}
    </div>
  );
};

export default AddCustomer;
