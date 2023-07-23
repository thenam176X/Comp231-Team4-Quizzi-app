import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Here, you can add your logic for form submission
    e.preventDefault();
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
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link to='/sign-in'>Sign In</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
