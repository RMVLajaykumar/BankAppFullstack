import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { signin } from "../services/authServices";
import { successToast, errorToast } from "./utils/toast";
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import { getUserId } from "../services/customerServices";
import validator from "validator";


const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formRef.current.querySelector("input[type='email']").value;
    const password = formRef.current.querySelector("input[type='password']").value;

    if (!validator.isEmail(email)) {
      errorToast("Invalid email format");
      return;
    }



    try {
      const response = await signin(email, password);
      const token = response.headers["authorization"];

      if (token) {
        localStorage.setItem("authToken", token);
      }


      if (response && response.data) {
        const roles = response.data.roles;
        if (roles.includes("ROLE_ADMIN")) {
          successToast(" Admin Successfully logged in");
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 1000); 
        } else {
          successToast(" User Successfully logged in");
          const user=await getUserId(response.data.email)
          setTimeout(() => {
            // localStorage.setItem('id',user.userId)
            localStorage.setItem("email",user.email)
          navigate(`/user-dashboard/${user.userId}`);
        }, 1000); 
        }
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorMessage = error.message || "An error occurred";
      const errorType = error.errorType || "Error";
      errorToast(`Error ${statusCode}: ${errorMessage}: ${errorType}` );
      
    }
  };

  return (
    <div className="container">
      <form className="form" ref={formRef}>

        <p className="form-title">Welocome to Pinacale Bank <br/>Login Your Account</p>
        <div className="login-input-container">
          <input type="email" placeholder="Enter email" />
        </div>
        <div className="login-input-container">
          <input type="password" placeholder="Enter password" />
        </div>
        <div className="register-link">
          Create New Account? <Link to='/register'>signup</Link>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Login
        </button>

      </form>
      <ToastContainer /> 
    </div>
  );
};

export default Login;
