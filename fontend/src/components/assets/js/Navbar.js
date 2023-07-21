import React, { useState,  } from 'react';

import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);


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
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/menu' className='nav-links' onClick={closeMobileMenu}>
                Get Started
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
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
          
          </ul>
         
          
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
