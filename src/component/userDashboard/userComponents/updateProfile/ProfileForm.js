import React, { useState, useEffect } from 'react';
import { getUserId, updateUserProfile } from '../../../../services/customerServices';
import { successToast, errorToast } from '../../../utils/toast'; 
import { useNavigate } from 'react-router-dom';
import './ProfileUpdate.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import { verifyUser } from '../../../../services/authServices';
import { NotFoundError } from '../../../utils/errors/APIError';
import validator from 'validator';


const UserDetailsForm = ({ email }) => {
  const navigate = useNavigate();
  const [error,setError]=useState(false);
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
        const statusCode = error.statusCode || "Unknown";
        const errorMessage = error.message || "An error occurred";
        const errorType = error.errorType || "Error";
        errorToast(`Error ${statusCode}: ${errorType}` );
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
    if (!validator.isAlpha(formData.firstName)) {
      errorToast("First Name should contain only alphabetic characters");
      return;
    }

    if (!validator.isAlpha(formData.lastName)) {
      errorToast("Last Name should contain only alphabetic characters");
      return;
    }
    try {
      await updateUserProfile(formData);
      successToast('User details updated successfully!');
    } catch (error) {
      setError(true)
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      errorToast(`Error ${statusCode}: ${errorType}` );
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
      {!error && (<> 
        <form onSubmit={handleSubmit}  disabled={error} className="user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
           required
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
            required
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
      </>)}
      {error && (
      <p style={{color:"red"}}> 
      you cannot update details since you are not a customer
      </p>
      )}
      
      <ToastContainer />
        </>
      )}
    </div>
  );
};

export default UserDetailsForm;
