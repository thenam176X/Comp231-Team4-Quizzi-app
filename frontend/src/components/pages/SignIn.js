import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/SignIn.css";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";
import Footer from "../assets/js/Footer";
const SignInPage = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Reset the passwordError state when the password meets the length requirement
    setPasswordError("");

    // If the password meets the length requirement, proceed with the sign-in request
    axios
      .post("http://localhost:8080/api/auth/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        setData(response.data);

        if (response.data.email) {
          localStorage.setItem("user", data);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (localStorage.getItem("user")) {
    window.location.href = "/dashboard";
  }

  return (
    <>
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
            {/* Display the password error message */}
            {passwordError && <p className='text-danger'>{passwordError}</p>}
          </div>
          <button type='submit' className='btn btn-primary'>
            Sign In
          </button>
        </form>
        <p className='mt-3'>
          Don't have an account? <Link to='/sign-up'>Sign Up</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SignInPage;
