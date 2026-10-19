import React,{useState,useEffect} from "react";
import "./AdminDashboard.css";
import api from "../utils/axios";
import {  Construction,Trash2,Lightbulb,Droplets,MoreHorizontal,ClipboardList,Clock,LoaderCircle,CheckCircle,Users,UserRound,ClipboardCheck, User } from "lucide-react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
const [loadingComplaints, setLoadingComplaints] = useState(true);
const [complaintError, setComplaintError] = useState("");
const [currentPage, setCurrentPage] = useState(1);

const complaintsPerPage = 5;

const totalPages = Math.ceil(complaints.length / complaintsPerPage);

const indexOfLastComplaint = currentPage * complaintsPerPage;
const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;

const currentComplaints = complaints.slice(
  indexOfFirstComplaint,
  indexOfLastComplaint
);
useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints/admin/all");
      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.error("Error fetching admin complaints:", error);
      setComplaintError("Unable to load complaints.");
    } finally {
      setLoadingComplaints(false);
    }
  };

  fetchComplaints();
}, []);
  const [stats, setStats] = useState({
  totalComplaints: 0,
  pendingComplaints: 0,
  assignedComplaints: 0,
  inProgressComplaints: 0,
  resolvedComplaints: 0,
  totalOfficers: 0,
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchDashboardStats = async () => {
    try {
      const response = await api.get("/complaints/admin/dashboard-stats");
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch admin dashboard stats:", err);
      setError("Unable to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardStats();
}, []);
const categoryIcons = {
  Roads: Construction,
  Garbage: Trash2,
  "Street-Light": Lightbulb,
  "Water Supply": Droplets,
  Other: MoreHorizontal
};
  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>
      <p>Here's what's happening in your city today.</p>

      {/* Dashboard Cards */}
      {error && <p className="admin-error">{error}</p>}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <ClipboardList className="admin-stat-icon"/>
          <h2>{loading ? "...": stats.totalComplaints}</h2>
          <p>Total Complaints</p>
        </div>

        <div className="admin-stat-card">
          <Clock className="admin-stat-icon"/>
          <h2>{loading ? "...": stats.pendingComplaints}</h2>
          <p>Pending</p>
        </div>
          
        <div className="admin-stat-card">
          <LoaderCircle className="admin-stat-icon"/>
          <h2>{loading ? "...": stats.inProgressComplaints}</h2>
          <p>In Progress</p>
        </div>

        <div className="admin-stat-card">
          <CheckCircle className="admin-stat-icon"/>
          <h2>{loading ? "...": stats.resolvedComplaints}</h2>
          <p>Resolved</p>
        </div>

        <div className="admin-stat-card">
          <Users className="admin-stat-icon"/>
          <h2>{loading ? "...": stats.totalOfficers}</h2>
          <p>Total Officers</p>
        </div>

        <div className="admin-stat-card">
          <UserRound className="admin-stat-icon"/>
          <h2>0</h2>
          <p>Registered Users</p>
        </div>
      </div>

      {/* Complaint Overview */}
      <div className="admin-overview">
        {/* <section className="admin-panel">
          <h3>Complaint Status Overview</h3>
          <p>Pending · In Progress · Resolved</p>
        </section> */}
               <section className="admin-panel">
  <h3>Complaint Status Overview</h3>

  {loading ? (
    <p>Loading complaint status...</p>
  ) : (
    <div className="status-overview">
      <div className="status-item">
         <Clock className="admin-stat-icon"/>
        <span>Pending</span>
        <strong>{stats.pendingComplaints}</strong>
      </div>

      <div className="status-item">
         <ClipboardCheck className="admin-stat-icon"/>
        <span>Assigned</span>
        <strong>{stats.assignedComplaints}</strong>
      </div>

      <div className="status-item">
        <LoaderCircle className="admin-stat-icon"/>
        <span>In Progress</span>
        <strong>{stats.inProgressComplaints}</strong>
      </div>

      <div className="status-item">
         <CheckCircle className="admin-stat-icon"/>
        <span>Resolved</span>
        <strong>{stats.resolvedComplaints}</strong>
      </div>
    </div>
  )}
</section>
           <section className="admin-panel category-panel">
  <h3>Category-wise Complaints</h3>
  
  {loading ? (
    <p>Loading categories...</p>
  ) : (
    <div className="category-list">
      {[
        "Roads",
        "Garbage",
        "Street-Light",
        "Water Supply",
        "Other"
      ].map((category) => {
        const categoryData = stats.categoryCounts?.find(
          (item) =>
            item._id?.toLowerCase() === category.toLowerCase()
        );

        return (
          // <div className="category-item" key={category}>
          //   <span>{category}</span>
          //   <strong>{categoryData?.count || 0}</strong>
          // </div>
          <div className="category-item" key={category}>
  {(() => {
    const Icon = categoryIcons[category];

    return Icon ? (
      <Icon className="category-icon" />
    ) : null;
  })()}

  <span>{category}</span>
  <strong>{categoryData?.count || 0}</strong>
</div>
        );
      })} 
    </div>
  )}
</section>
        {/* <section className="admin-panel">
          <h3>Category-wise Complaints</h3>
          <p>Roads · Garbage · Street Light · Water Supply · Other</p>
        </section> */}
      </div>

      {/* Recent Complaints and Map */}
      <div className="admin-bottom">
       <section className="admin-panel">
  <h3>Recent Complaints</h3>

  {loadingComplaints ? (
    <p>Loading complaints...</p>
  ) : complaintError ? (
    <p>{complaintError}</p>
  ) : complaints.length === 0 ? (
    <p>No complaints found.</p>
  ) : (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Citizen</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {currentComplaints.map((complaint) => (
            <tr key={complaint._id}>
              <td>{complaint.complaintId}</td>
              <td>{complaint.title}</td>
              <td>{complaint.category}</td>
              <td>
                {complaint.citizen?.name || "N/A"}
              </td>
              <td>
                <span
                  className={`admin-status ${complaint.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {complaint.status}
                </span>
              </td>
              <td>
                {complaint.createdAt
                  ? new Date(complaint.createdAt).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )}
  <div className="pagination">
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      className={currentPage === index + 1 ? "active" : ""}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages || totalPages === 0}
  >
    Next
  </button>
</div>
</section>

        {/* <section className="admin-panel">   
          <h3>Complaints on Map</h3>
          <p>Complaint locations will appear here.</p>
        </section> */}
      </div> 
    </div>
  );
};

export default AdminDashboard;