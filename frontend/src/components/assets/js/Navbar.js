import React, { useState } from "react";

import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            QUIZZI
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {user && (
              <>
                <li className='nav-item'>
                  <Link
                    to='/create-quiz'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Quiz Creator
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    to='/available-quiz-preview'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Available Quiz Preview
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/quiz-preview'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Quiz Preview
                  </Link>
                  
                </li>
                <li className='nav-item'>
                  <Link
                    to='/available-quiz'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Available Quiz
                  </Link>
                  
                </li>
                <li className='nav-item'>
                  <Link
                    to='/take-quiz'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Taking Quiz
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/grade-quiz'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Grade Quiz
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/form-data'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    User Account
                  </Link>
                </li>
              </>
            )}

            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>

            {!user ? (
              <>
                {" "}
                <li>
                  <Link
                    to='/sign-in'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to='/sign-up'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to='/sign-in'
                  className='nav-links'
                  onClick={() => {
                    closeMobileMenu();
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                >
                  Log Out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
