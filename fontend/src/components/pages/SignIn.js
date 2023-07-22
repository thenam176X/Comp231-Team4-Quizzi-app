import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/SignIn.css";
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const SignInPage = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(event) {
    axios
      .post("http://localhost:8080/api/auth/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    localStorage.setItem("user", data);
  }

  if (localStorage.getItem("user")) {
    return <Redirect to='/menu' />;
  }
  return (
    <div className='container mt-5'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign In
        </button>
      </form>
      <p className='mt-3'>
        Don't have an account? <Link to='/sign-up'>Sign Up</Link>
      </p>
    </div>
  );
};

export default SignInPage;
