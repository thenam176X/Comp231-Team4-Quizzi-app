import React from "react";
import "../assets/css/About.css";
import Footer from "../assets/js/Footer";
const About = () => {
  return (
    <>
      <div class='about-container'>
        <div class='about-section'>
          <h1>About Us </h1>
          <p>We are potential future programmers.</p>
        </div>
        <h2>Our Team</h2>
        <div class='row'>
          <div class='column'>
            <div class='card'>
              <div class='container'>
                <h2>TheNam Nguyen</h2>
                <h2>301146573</h2>
                <p class='title'>Frontend Developer</p>
                <p>
                  I have experience in Web programming especially in Angular and
                  React.
                </p>
                <p>tnguy892@my.centennialcollege.ca</p>
              </div>
            </div>
          </div>

          <div class='column'>
            <div class='card'>
              <div class='container'>
                <h2>Milankumar Khunt</h2>
                <h2>301245415</h2>
                <p class='title'>Backend Developer</p>
                <p>
                  I have experience in Backend programming especially in Angular
                  and React.
                </p>
                <p>mkhunt2@my.centennialcollege.ca</p>
              </div>
            </div>
          </div>

          <div class='column'>
            <div class='card'>
              <div class='container'>
                <h2>Minh Tri Le</h2>
                <h2>301323963</h2>
                <p class='title'>Backend Developer</p>
                <p>
                  I have experience in Backend programming especially in Angular
                  and React.
                </p>
                <p>mle59@my.centennialcollege.ca</p>
              </div>
            </div>
          </div>
          <div class='column'>
            <div class='card'>
              <div class='container'>
                <h2>Que Thi Nguyen</h2>
                <h2>301221756</h2>
                <p class='title'>Frontend Developer</p>
                <p>
                  I have experience in Web programming especially in Angular and
                  React.
                </p>
                <p>qnguye92@my.centennialcollege.ca </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
