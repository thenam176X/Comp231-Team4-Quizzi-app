import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className='footer-container'>
      
      <div class='social-media-wrap'>
      <a href='https://www.facebook.com/' className='social-icons'>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href='https://www.instagram.com/' className='social-icons'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='https://www.youtube.com/' className='social-icons'>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          </div>
          <small className='webcenter'>QUIZZI-TEAM4 @2023</small>
           
    </div>
  );
}

export default Footer;
