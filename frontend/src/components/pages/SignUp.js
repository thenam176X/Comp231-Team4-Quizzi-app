import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Footer from '../assets/js/Footer';
const SignUpForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roles: ["user"],
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') {
      setFormData((prevState) => ({
        ...prevState,
        roles: [value],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    // Here, you can add your logic for form submission
    e.preventDefault();

    // Check if the password is at least 8 characters long
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordError(""); // Reset the error if password is valid
    }

    // Check if the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    } else {
      setConfirmPasswordError(""); // Reset the error if passwords match
    }

    axios
      .post("http://localhost:8080/api/auth/signup", formData)
      .then((response) => {
        if (response.data.status === 1) {
          console.log(response.data);
          history.push("/sign-in");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
    <div className='container mt-5'>
      <h2>Sign Up</h2>
      
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            className='form-control'
            id='firstName'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            className='form-control'
            id='lastName'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='role' className='form-label'>
            Choose Your Role
          </label>
          <select
            className='form-select'
            id='role'
            name='role'
            value={formData.role}
            onChange={handleChange}
          >
            <option value='educator'>Educator</option>
            <option value='contentCreator'>Content Creator</option>
            <option value='user'>General User</option>
            <option value='user'>Administrator</option>
          </select>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Display the password error message */}
          {passwordError && <p className='text-danger'>{passwordError}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {/* Display the confirm password error message */}
          {confirmPasswordError && (
            <p className='text-danger'>{confirmPasswordError}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link to='/sign-in'>Sign In</Link>
      </p>
    </div>
    <Footer/>
     </>
  );
};

export default SignUpForm;
