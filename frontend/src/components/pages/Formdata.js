import React, { useState } from "react";
import "../assets/css/Formdata.css"
import personal_img from "../assets/img/userProfile.png";

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
    <div class="userAccount-container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
  <img class="rounded-circle mt-5" width="100px" src={editedData.image || personal_img} /><br></br>
  <input type="file" class="input-control" onChange={handleImageChange} />
  <span>{editedData.name}{editedData.surname}</span>
  <span>{editedData.email}</span>
</div>

         
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Name</label>
                <input type="text" class="form-control" placeholder="first name" value={editedData.name} name="name" onChange={handleChange}/>
              </div>
              <div class="col-md-6">
                <label class="labels">Surname</label>
                <input type="text" class="form-control" placeholder="surname" value={editedData.surname} name="surname" onChange={handleChange}/>
              </div>
              </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label>
                    <input type="text" class="form-control" placeholder="enter phone number" value={editedData.phonenumber} name="phoneNumber" onChange={handleChange}/>
                    </div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label>
                    <input type="text" class="form-control" placeholder="enter address line 1"value={editedData.address1} name="address1" onChange={handleChange}/>
                    </div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label>
                    <input type="text" class="form-control" placeholder="enter address line 2"value={editedData.address2} name="address2" onChange={handleChange}/>
                    </div>
                    <div class="col-md-12"><label class="labels">Postcode</label>
                    <input type="text" class="form-control" placeholder="enter postcode" value={editedData.postcode} name="postcode" onChange={handleChange}/>
                    </div>
                    <div class="col-md-12"><label class="labels">Email </label>
                    <input type="text" class="form-control" placeholder="enter email " value={editedData.email} name="email" onChange={handleChange}/>
                    </div>
                    <div class="col-md-12"><label class="labels">Education</label>
                    <input type="text" class="form-control" placeholder="education" value={editedData.education} name="education" onChange={handleChange}/>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label>
                    <input type="text" class="form-control" placeholder="country"  value={editedData.country} name="country" onChange={handleChange}/>
                    </div>
                    <div class="col-md-6"><label class="labels">State/Region</label>
                    <input type="text" class="form-control" placeholder="State" value={editedData.state} name="state" onChange={handleChange}/>
                    </div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={handleSave}>Save Profile</button></div>
            </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default Formdata;