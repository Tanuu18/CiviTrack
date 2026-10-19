import React,{useEffect,useState} from "react";
import "./OfficerProfile.css";
import api from '../utils/axios'

const OfficerProfile = () => {
   const [profile, setProfile] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
      
      console.log(
        "FETCH PROFILE ERROR:",
        error.response?.data
      );
    }
  };

  fetchProfile();
}, []); 
if(!profile){
  return <p>Loading Profile....</p>
}     
  return (
    <div className="officer-profile">

      <div className="profile-heading">
        <h1>Officer Profile</h1>
        <p>View and manage your personal and work information</p>
      </div>

      {/* Profile Header */}
      <div className="profile-header-card">

        <div className="profile-photo">
          <div className="photo-placeholder">👤</div>
        </div>

        <div className="profile-basic">
          <h2>{profile.name}</h2>
          <span>{profile.designation}</span>
          <p>Officer ID:{profile.officerId}</p>
          <p>{profile.department}</p>
        </div>

        <button className="edit-profile-btn">
          ✎ Edit Profile
        </button>

      </div>

      {/* Personal Information */}
      <div className="profile-card">
        <h2>👤 Personal Information</h2>

        <div className="profile-grid">

          <div className="profile-field">
            <label>Full Name</label>
            <div>{profile.name}</div>
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <div>{profile.email}</div>
          </div>

          <div className="profile-field">
            <label>Phone Number</label>
            <div>{profile.phone || "Not provided"}</div>
          </div>

          <div className="profile-field">
            <label>Date of Joining</label>
            <div>{new Date(profile.createdAt).toLocaleDateString("en-GB")}</div>
          </div>

        </div>
      </div>

      {/* Work Information */}
      <div className="profile-card">
        <h2>💼 Work Information</h2>

        <div className="profile-grid">

          <div className="profile-field">
            <label>Department</label>
            <div>{profile.department || "not provided"}</div>
          </div>

          <div className="profile-field">
            <label>Designation</label>
            <div>{profile.designation || "not provided"}</div>
          </div>

          <div className="profile-field">
            <label>Assigned Ward/Area</label>
            <div>{profile.area || "not provided"}</div>
          </div>

          <div className="profile-field">
            <label>Officer ID</label>
            <div>{profile.officerId || "not provided"}</div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default OfficerProfile;