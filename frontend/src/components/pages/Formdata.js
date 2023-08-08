import React, { useState } from "react";
import "../assets/css/Formdata.css"

const Formdata = ({ formData }) => {
  const [editedData, setEditedData] = useState({ ...formData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setEditedData((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(img),
      }));
    }
  };
  
  const handleSave = () => {
    fetch('/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'USER_ID', // Replace with the actual user ID
        profileData: editedData,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="container1 mt-5">
      <h2>User Info</h2>
      <form>
        <div className="name">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={editedData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={editedData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            User Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={editedData.role}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add similar fields for lastName, email, role, password, and confirmPassword */}
        {/* You can use the existing handleChange function for these fields */}

        {/* Additional Fields */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={editedData.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <textarea
            className="form-control"
            id="about"
            name="about"
            value={editedData.about || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={editedData.country || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={editedData.language || ""}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="buttons-container">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <Link to="/form-data" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Formdata;
