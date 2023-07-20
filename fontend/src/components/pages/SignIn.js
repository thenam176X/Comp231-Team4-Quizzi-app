import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/SignIn.css';

const SignInPage = () => {
  return (
    <div className="container mt-5">
      <h2>Sign In</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
      
    </div>
   
  );
};

export default SignInPage;
