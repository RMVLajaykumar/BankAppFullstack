import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Register.css';
import { signup } from "../services/AuthServices";
import { successToast, errorToast } from "./utils/toast";
import { ToastContainer } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formRef.current.querySelector("input[name='name']").value;
    const email = formRef.current.querySelector("input[type='email']").value;
    const password = formRef.current.querySelector("input[type='password']").value;
    const admin = formRef.current.querySelector("input[name='role']").checked;

    try {
      const response = await signup(name, email, password, admin);

      if (response && response.status === 201) { 
        successToast("Account created successfully. Please log in.");
        setTimeout(() => {
          navigate("/");
        }, 1000); 
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      errorToast("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="container">
      <form className="form" ref={formRef}>
        <p className="form-title">Create Your Account</p>
        <div className="register-input-container">
          <input type="text" name="name" placeholder="Enter name" required />
        </div>
        <div className="register-input-container">
          <input type="email" placeholder="Enter email" required />
        </div>
        <div className="register-input-container">
          <input type="password" placeholder="Enter password" required />
        </div>
        <div className="role-selection">
          <label>
            <input type="radio" name="role"  required /> Admin
          </label>
        </div>
        <div className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </div>
        <button type="submit" className="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
