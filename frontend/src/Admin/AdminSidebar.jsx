import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        🏛️ CIVICTRACK
      </div>

      {/* Menu */}
      <nav className="admin-menu">

        <NavLink to="/admin/dashboard">Dashboard</NavLink>

        <NavLink to="/admin/add-officer">Add Officer</NavLink>

        <NavLink to="/admin/officers">Officers</NavLink>

        {/* <NavLink to="/admin/complaints">Complaints</NavLink>

        <NavLink to="/admin/categories">Categories</NavLink>

        <NavLink to="/admin/users">Users</NavLink> */}

        <NavLink to="/admin/notifications">Notifications</NavLink>

      </nav>

      {/* Logout */}
      <div className="admin-logout"  onClick={handleLogout}>
        Logout
      </div>

    </div>
  );
};

export default AdminSidebar;