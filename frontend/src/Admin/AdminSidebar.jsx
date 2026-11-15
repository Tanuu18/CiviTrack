import React,{useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate=useNavigate();
  const [isOpen,setIsOpen]=useState(false);
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
       
     {/* Mobile Hamburger Button */}
    <button
      className="admin-menu-toggle"
      onClick={() => setIsOpen(!isOpen)}
    >
      ☰
    </button>

    {/* Overlay */}
    {isOpen && (
      <div
        className="admin-overlay"
        onClick={() => setIsOpen(false)}
      ></div>
    )}

    {/* Sidebar */}
    <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>

       {/* Close Button */}
      <button
        className="admin-close-btn"
        onClick={() => setIsOpen(false)}
      >
        ×
      </button>
      {/* Logo */}
      <div className="admin-logo">
        🏛️ CIVICTRACK
      </div>

      {/* Menu */}
      <nav className="admin-menu">

        <NavLink to="/admin/dashboard" onClick={()=>setIsOpen(false)}>Dashboard</NavLink>

        <NavLink to="/admin/add-officer" onClick={()=>setIsOpen(false)}>Add Officer</NavLink>

        <NavLink to="/admin/officers" onClick={()=>setIsOpen(false)}>Officers</NavLink>

        {/* <NavLink to="/admin/complaints">Complaints</NavLink>

        <NavLink to="/admin/categories">Categories</NavLink>

        <NavLink to="/admin/users">Users</NavLink> */}

        {/* <NavLink to="/admin/notifications">Notifications</NavLink> */}

      </nav>

      {/* Logout */}
      <div className="admin-logout"  onClick={handleLogout}>
        Logout
      </div>

    </div>
    </>
  );
};

export default AdminSidebar;