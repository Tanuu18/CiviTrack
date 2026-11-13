import React,{useEffect,useState} from "react";
import "./OfficerProfile.css";
import api from '../utils/axios'

const OfficerProfile = () => {
   const [profile, setProfile] = useState(null);
   const [toast,setToast]=useState(null);
    const [isEditing, setIsEditing] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  phone: "",
  department: "",
  designation: "",
  area: "",
});

const [selectedImage, setSelectedImage] = useState(null);
const [preview, setPreview] = useState("");
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setProfile(response.data.user);
      setFormData({
  name: response.data.user.name || "",
  phone: response.data.user.phone || "",
  department: response.data.user.department || "",
  designation: response.data.user.designation || "",
  area: response.data.user.area || "",
});

setPreview(response.data.user.profileImage || "");
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

const handleSaveProfile = async () => {
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("area", formData.area);

    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    const response = await api.put(
      "/auth/profile",
      formDataToSend
    );

    setProfile(response.data.user);
    setPreview(response.data.user.profileImage||"");
    setIsEditing(false);
    setSelectedImage(null);

    setToast({type:"success",message:"Profile updated successfully!"});
  } catch (error) {
    console.error("Profile update error:", error);
    setToast({type:"error",message:"Failed to update profile"});
  }
};
  return (
    <div className="officer-profile">

      <div className="profile-heading">
        <h1>Officer Profile</h1>
        <p>View and manage your personal and work information</p>
      </div>

      {/* Profile Header */}
      <div className="profile-header-card">

        {/* <div className="profile-photo">
          <div className="photo-placeholder">👤</div>
        </div> */}
<div className="profile-avatar">
  {profile.profileImage ? (
    <img
      src={profile.profileImage}
      alt="Officer Profile"
      className="profile-avatar-image"
    />
  ) : (
    <span>👤</span>
  )}
</div>
        <div className="profile-basic">
          <h2>{profile.name}</h2>
          <span>{profile.designation}</span>
          <p>Officer ID:{profile.officerId}</p>
          <p>{profile.department}</p>
        </div>

        <button className="edit-profile-btn" onClick={()=>setIsEditing(true)}>
          ✎ Edit Profile
        </button>
          {isEditing && (
  // <div className="edit-profile-form">
     <div className="modal-overlay">
    <div className="edit-profile-modal">
    <h2>Edit Profile</h2>
    <div className="form-group">
  <label>Full Name</label>
  <input
    type="text"
    value={formData.name}
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
  />
</div>

<div className="form-group">
  <label>Phone</label>
  <input
    type="text"
    value={formData.phone}
    onChange={(e) =>
      setFormData({ ...formData, phone: e.target.value })
    }
  />
</div>
<div className="form-group">
  <label>Department</label>
  <input
    type="text"
    value={formData.department}
    onChange={(e) =>
      setFormData({ ...formData, department: e.target.value })
    }
  />
</div>

<div className="form-group">
  <label>Designation</label>
  <input
    type="text"
    value={formData.designation}
    onChange={(e) =>
      setFormData({ ...formData, designation: e.target.value })
    }
  />
</div>

<div className="form-group">
  <label>Area</label>
  <input
    type="text"
    value={formData.area}
    onChange={(e) =>
      setFormData({ ...formData, area: e.target.value })
    }
  />
</div>
<div className="form-group">
  <label>Profile Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];

      if (file) {
        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
      }
    }}
  />

  {preview && (
    <img
      src={preview}
      alt="Profile Preview"
      className="profile-preview"
    />
  )}
</div>
<div className="form-actions">
  <button type="button" onClick={handleSaveProfile}>
    Save Changes
  </button>

  <button
    type="button"
    onClick={() => setIsEditing(false)}
  >
    Cancel
  </button>
</div>
  </div>
  </div>
)}
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