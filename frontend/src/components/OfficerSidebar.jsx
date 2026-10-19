import React from "react";
import "./OfficerSidebar.css"
import { LayoutDashboard,ClipboardList,User,Bell,LogOut } from "lucide-react";
import cityImage from "../assets/officer.jpg"
import { NavLink,useNavigate } from "react-router-dom";

const OfficerSidebar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className="officer-sidebar"> 
      <nav className="officer-nav">

  <NavLink to="/officer" end >        
    <LayoutDashboard size={20} />
    <span>Dashboard</span>
  </NavLink>

  <NavLink to="/officer/complaints"> 
    <ClipboardList size={20} />
    <span>Assigned Complaints</span>
  </NavLink> 

  <NavLink to="/officer/profile">
    <User size={20} />
    <span>Profile</span>
  </NavLink>

  {/* <NavLink to="/officer/notifications">
    <Bell size={20} />
    <span>Notifications</span>
  </NavLink> */}

</nav>

<div className="sidebar-city-image">
  <img src={cityImage} alt="CiviTrack city" />
</div>
<button className="officer-logout" onClick={handleLogout}>
  <LogOut size={20} />
  <span>Logout</span>
</button>
    </div>
  )
}

export default OfficerSidebar
