import React from "react";
import { useEffect, useState } from "react";
import "./OfficerComplaints.css";
import Pagination from "@mui/material/Pagination";
import api from "../utils/axios";

const OfficerComplaints = () => {
  //const [page,setPage]=useState(1);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.complaintId.toLowerCase().includes(search.toLowerCase()) ||
      complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || complaint.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || complaint.status === statusFilter;
    const matchesDate = dateFilter === "" || new Date(complaint.createdAt).
      toLocaleDateString("en-CA") === dateFilter;
    return (matchesSearch && matchesCategory && matchesStatus && matchesDate);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 5;

  const totalPages = Math.ceil(
    filteredComplaints.length / complaintsPerPage
  );

  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint =
    indexOfLastComplaint - complaintsPerPage;

  const currentComplaints = complaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get("/complaints/officer");
        console.log(response.data);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.log(error.response?.data);

      }
    }
    fetchComplaints();
  }, []);
  const handleViewComplaint = async (complaintId) => {
    try {
      const response = await api.get(`/complaints/${complaintId}`);
      console.log(response.data);
      console.log("MongoDB ID:", response.data.complaint._id);
      setSelectedComplaint(response.data.complaint);
      setStatus(response.data.complaint.status);
    } catch (error) {
      console.log(error.response?.data);

    }
  }

  const handleAIAnalysis = async () => {
    try {
      setAiLoading(true);
      setAiError("");
      setAiAnalysis(null);

      const response = await api.post("/ai/analyze", {
        // description: selectedComplaint.description
        title: selectedComplaint.title,
        description: selectedComplaint.description,
        category: selectedComplaint.category,
        location: selectedComplaint.location
      });

      setAiAnalysis(response.data.analysis);
    } catch (error) {
      console.log("AI Analysis Error:", error.response?.data || error);
      setAiError("AI analysis failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };
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

  const handleDeleteComplaint=()=>{
    setShowDeleteModal(true);
  }
  const confirmDeleteComplaint = async () => {

  try {
    await api.delete(`/complaints/${selectedComplaint._id}`);

    setComplaints((prevComplaints) =>
      prevComplaints.filter(
        (complaint) => complaint._id !== selectedComplaint._id
      )
    );

    setSelectedComplaint(null);
    setShowDeleteModal(false);
  } catch (error) {
    console.log("DELETE COMPLAINT ERROR:", error.response?.data);
    alert("Failed to delete complaint");
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by complaint ID, issue or location..."
          />
        </div>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Street-Light">Street Light</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Roads">Roads</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Other">Other</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>


        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />

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
            {filteredComplaints
              .slice(
                (currentPage - 1) * complaintsPerPage,
                currentPage * complaintsPerPage
              )
              .map((complaint, index) => (
                <tr key={complaint._id}>
                  <td>{(currentPage - 1) * complaintsPerPage + index + 1}</td>

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
                      onClick={() => handleViewComplaint(complaint.complaintId)}>
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


              <p>
                <strong>Category:</strong>{" "}
                {selectedComplaint.category}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {selectedComplaint.location}
              </p>
              {selectedComplaint.image && (
                <div className="complaint-image-section">
                  <h3>Complaint Image</h3>
                  <img src={selectedComplaint.image} alt="complaint evidence"
                    className="complaint-evidence-image" />
                </div>
              )}

              <div className="ai-analysis-section">
                <h3>AI Complaint Assessment</h3>

                <button
                  className="ai-analysis-btn"
                  onClick={handleAIAnalysis}
                  disabled={aiLoading}
                >
                  {aiLoading ? "Analyzing..." : "Get AI Suggestions"}
                </button>

                {aiError && <p>{aiError}</p>}

                {aiAnalysis && (
                  <div className="ai-analysis-result">
                    <p><strong>Category:</strong> {aiAnalysis.category}</p>


                    <p>
                      <strong>Priority:</strong>{" "}
                      <span className={`priority-badge ${aiAnalysis.priority?.toLowerCase()}`}>
                        {aiAnalysis.priority}
                      </span>
                    </p>
                    <p><strong>Summary:</strong> {aiAnalysis.summary}</p>
                    <p><strong>Impact:</strong> {aiAnalysis.impact}</p>

                    <p><strong>Urgency Reason:</strong> {aiAnalysis.urgencyReason}</p>

                    <p><strong>Recommended Action:</strong> {aiAnalysis.recommendedAction}</p>
                  </div>
                )}
              </div>
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
              <button
                className="delete-btn"
                onClick={handleDeleteComplaint}
              >
                Delete Complaint
              </button>
        
            </div>
          </div>
        )}
        {showDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <h2>Delete Complaint?</h2>

      <p>
        Are you sure you want to delete this complaint?
      </p>

      <div className="delete-modal-actions">
        <button
          className="cancel-delete-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={confirmDeleteComplaint}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
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
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default OfficerComplaints;