import React, { useState, useEffect } from 'react';
import { getUserId, updateUserProfile } from '../../../../services/CustomerServices';
import { successToast, errorToast } from '../../../utils/toast'; 
import { useNavigate } from 'react-router-dom';
import './ProfileUpdate.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import { verifyUser } from '../../../../services/AuthServices';

const UserDetailsForm = ({ email }) => {
  const navigate = useNavigate();
  const[isUser,setIsUser]=useState();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserId(localStorage.getItem("email"));
        setFormData({
          firstName: response.userName.split(" ")[0],
          lastName: response.userName.split(" ")[1],
          email: response.email
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      successToast('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user details:', error);
      errorToast('Failed to update user details.');
    }
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="form-container">
      {isUser && (
        <>
        <button onClick={handleBackClick} className="back-button">Back</button>
      <h2 className="form-title">Update User Details</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="form-input"
            disabled
          />
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
      <ToastContainer />
        </>
      )}
    </div>
  );
};

export default UserDetailsForm;
