import React from 'react';
import "../assets/css/About.css"
import Footer from '../assets/js/Footer';
const About = () => {
  return (
    <>
    <div class="about-container">
      <div class="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
      </div>
      <h2>
        Our Team
      </h2>
      <div class="row">
        <div class="column">
          <div class="card">
            
            <div class="container">
              <h2>Jane Doe</h2>
              <p class="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p><button class="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            
            <div class="container">
              <h2>Jane Doe</h2>
              <p class="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p><button class="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            
            <div class="container">
              <h2>Jane Doe</h2>
              <p class="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p><button class="button">Contact</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;

