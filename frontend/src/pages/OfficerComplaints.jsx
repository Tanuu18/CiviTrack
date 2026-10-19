import React from "react";
import { useEffect,useState } from "react";
import "./OfficerComplaints.css";
import  Pagination  from "@mui/material/Pagination";
import api from "../utils/axios";

const OfficerComplaints = () => {
  const [page,setPage]=useState(1);
  const [complaints,setComplaints]=useState([]);
  const [selectedComplaint,setSelectedComplaint]=useState(null);
  const [status,setStatus]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  const [categoryFilter,setCategoryFilter]=useState("All");
  const [search,setSearch]=useState("");
  const [dateFilter,setDateFilter]=useState("");
  const filteredComplaints=complaints.filter((complaint)=>{
    const matchesSearch=complaint.complaintId.toLowerCase().includes(search.toLowerCase()) || 
    complaint.title.toLowerCase().includes(search.toLowerCase()) ||
    complaint.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory=categoryFilter==="All"||complaint.category===categoryFilter;
    const matchesStatus=statusFilter==="All"||complaint.status===statusFilter;
    const matchesDate=dateFilter===""||new Date(complaint.createdAt).
    toLocaleDateString("en-CA")===dateFilter;
     return (matchesSearch && matchesCategory && matchesStatus && matchesDate);
  });
  useEffect(()=>{
    const fetchComplaints=async()=>{ 
      try {
        const response=await api.get("/complaints/officer");
        console.log(response.data);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.log(error.response?.data);
        
      }  
    }
    fetchComplaints();
  },[]);
  const handleViewComplaint=async(complaintId)=>{
    try {
      const response=await api.get(`/complaints/${complaintId}`);
      console.log(response.data);
      setSelectedComplaint(response.data.complaint);
      setStatus(response.data.complaint.status);
    } catch (error) {
      console.log(error.response?.data);
      
    }
  }
  const handleStatusUpdate = async () => {
  try {
    const response = await api.put(
      `/complaints/${selectedComplaint.complaintId}/status`,
      {
        status 
      }
    );

    console.log(response.data);

    setSelectedComplaint(response.data.complaint);
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.complaintId === selectedComplaint.complaintId
          ? { ...complaint, status }
          : complaint
      )
    );
  } catch (error) {
    console.log(
      "UPDATE STATUS ERROR:",
      error.response?.data
    );
  }
};
  return ( 
    
    <div className="officer-complaints">

      <div className="complaints-header">

        <div>
          <h1>Assigned Complaints</h1>
          <p>Manage and track all complaints assigned to you.</p>
        </div>

        <div className="total-assigned">
          <div className="total-icon">📄</div>

          <div>
            <h2>{complaints.length}</h2>
            <span>Total Assigned</span>
          </div>
        </div>

      </div>
      <div className="complaints-filters">

  <div className="search-box">
    <span>🔍</span>
    <input
      type="text"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search by complaint ID, issue or location..."
    />
  </div>

  <select value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)}>
    <option value="All">All Categories</option>
    <option value="Street-Light">Street Light</option>
    <option value="Sanitation">Sanitation</option>
    <option value="Roads">Roads</option>
    <option value="Water Supply">Water Supply</option>
    <option value="Infrastructure">Infrastructure</option>
    <option value="Other">Other</option>
  </select>

  <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>

  {/* <select value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)}>
    <option >Select Date</option>
    <option>Newest First</option>
    <option>Oldest First</option>
  </select> */}
  <input type="date" value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)}/>

</div>
     <div className="assigned-table-card">

  <table className="assigned-table">

    <thead>
      <tr>
        <th>#</th>
        <th>Complaint ID</th>
        <th>Issue</th>
        <th>Category</th>
        <th>Location</th>
        <th>Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>

      
       <tbody>
  {filteredComplaints.map((complaint, index) => (
    <tr key={complaint._id}>
      <td>{index + 1}</td>

      <td>{complaint.complaintId}</td>

      <td>{complaint.title}</td>

      <td>
        <span
          className={`category ${complaint.category
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {complaint.category}
        </span>
      </td>

      <td>{complaint.location}</td>

      <td>
        {new Date(complaint.createdAt).toLocaleDateString("en-GB")}
      </td>

      <td>
        <span
          className={`status ${complaint.status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {complaint.status}
        </span>
      </td>

      <td>
        <button className="view-btn"
         onClick={()=>handleViewComplaint(complaint.complaintId)}>
          View
        </button>
      </td>
    </tr>
  ))}
    </tbody>

  </table>
  {selectedComplaint && (
  <div className="complaint-modal">
    <div className="complaint-modal-content">

      <h2>Complaint Details</h2>

      <p>
        <strong>Complaint ID:</strong>{" "}
        {selectedComplaint.complaintId}
      </p>

      <p>
        <strong>Issue:</strong>{" "}
        {selectedComplaint.title}
      </p>

      {/* <p>
        <strong>Description:</strong>{" "}
        {selectedComplaint.description}
      </p> */}

      <p>
        <strong>Category:</strong>{" "}
        {selectedComplaint.category}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {selectedComplaint.location}
      </p>

      {/* <p>
        <strong>Status:</strong>{" "}
        {selectedComplaint.status}
      </p> */}
       <div className="status-update">
  <strong>Status:</strong>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="Assigned">Assigned</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>

  <button
    className="update-status-btn"
    onClick={handleStatusUpdate}
  >
    Update Status
  </button>
</div>
      <button
        className="close-btn"
        onClick={() => setSelectedComplaint(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
  <div className="pagination">
   <Pagination count={3}  color="primary" shape="rounded" onChange={(event,value)=>setPage(value)}/>
  </div>

</div>
    </div>
  );
};

export default OfficerComplaints;