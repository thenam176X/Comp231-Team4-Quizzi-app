import React from 'react';
import emailjs from 'emailjs-com'; // Import the emailjs library
import "../assets/css/Contact.css";
import Footer from '../assets/js/Footer';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Your EmailJS service parameters
    const serviceId = 'service_dqbvufh';
    const templateId = 'template_shor8rb';
    const userId = 'S9P4u3i-sxf_iIjVE';

    // Your email parameters
    const emailParams = {
      to_email: 'quizziapp44@gmail.com',
      from_name: e.target.name.value,
      from_email: e.target.email.value,
      message: e.target.message.value,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, emailParams, userId)
      .then((response) => {
        console.log('Email sent successfully!', response);
        alert('Your email has been sent!');
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again later.');
      });
  };

  return (
    <>
      <div className="contactPage-container">
        <div className="form-container">
          <h3>Send Message Us</h3>
          <form onSubmit={handleSubmit}>
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
              <textarea className="form-control" id="message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="contact-container">
          <h3>Get in Touch</h3>
          <p>Questions or concerns? We are here to listen!
          </p>
          <p>We strive to provide the best possible service to every contact. Our support team ensures that you get the best advice and guidance on any of your queries.
          </p>
          <p>Address: 941 Progress Avenue</p>
          <p>Phone: 888-888-888</p>
          <p>Email: quizziapp44@gmail.com</p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;
