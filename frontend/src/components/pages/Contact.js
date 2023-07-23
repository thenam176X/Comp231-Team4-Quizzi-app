import React from 'react';
import "../assets/css/Contact.css"
import Footer from '../assets/js/Footer';

const ContactPage = () => {
  return (
    <>
    <div class="contactPage-container">
      <div class="form-container">
      <h3>Send Message Us</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="name" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea type="message" className="form-control" id="message" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        
      </form>
      </div>
      <div class="contact-container">
        <h3>Get in Touch</h3>
        <p>Queries, Concern? We are here to listen! We strive to offer
          the best possible service to every contact. Our support team make sure that you get 
          the best advice and guidance regarding whatever queries you have.
        </p>
        <p>Address: 941 Progress Avenue</p>
        <p>Phone: 888-888-888</p>
        <p>Email: quizzi@gmail.com</p>
      </div>
    </div>
    <Footer/>
     </>
  );
};

export default ContactPage;

