import React,{useState} from "react";
import "./OfficerSidebar.css"
import { LayoutDashboard,ClipboardList,User,Bell,LogOut,Menu,X } from "lucide-react";
import cityImage from "../assets/officer.jpg"
import { NavLink,useNavigate } from "react-router-dom";

const OfficerSidebar = () => {
  const navigate=useNavigate();
  const [isOpen,setIsOpen]=useState(false);
  const closeSidebar=()=>{
    setIsOpen(false);
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    // <div className="officer-sidebar"> 
    <>
    {/* Hamburger Button */}
      <button
        className="officer-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="officer-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      <div className={`officer-sidebar ${isOpen ? "open" : ""}`}>
      <nav className="officer-nav">

  <NavLink to="/officer" end onClick={closeSidebar} >        
    <LayoutDashboard size={20} />
    <span>Dashboard</span>
  </NavLink>

  <NavLink to="/officer/complaints" onClick={closeSidebar}> 
    <ClipboardList size={20} />
    <span>Assigned Complaints</span>
  </NavLink> 

  <NavLink to="/officer/profile" onClick={closeSidebar}>
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
    </>
  )
}

export default OfficerSidebar
