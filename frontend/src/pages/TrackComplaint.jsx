import React,{useState} from "react";
import "./TrackComplaint.css";
import api from "../utils/axios";

const TrackComplaint = () => {
  const [showResult,setShowResult]=useState(false);
  const [complaint,setComplaint]=useState(null);
   const [complaintId,setComplaintId]=useState("");
   const statusSteps=[
    "Pending",
    "Assigned",
    "In Progress",
    "Resolved"
  ];
  const currentStatusIndex=statusSteps.indexOf(complaint?.status); 

  return (
    <div className="track-page">
      <div className="track-container">

        <h2>Track Your Complaint</h2>

        <p className="track-subtitle">
          Enter your complaint ID to check the status of your complaint.
        </p>

        <form onSubmit={ async(e)=>{
          e.preventDefault();
          const formData=new FormData(e.target);
          const complaintId=formData.get("complaintId");
          try {
            const response=await api.get(`/complaints/${complaintId}`);
            console.log(response.data);
            setComplaint(response.data.complaint);
            setShowResult(true);
          } catch (error) {
            console.log(error.response?.data);
            setShowResult(false);
          }
          
        }}>
          <label>Complaint ID</label>

          <input
            type="text" name="complaintId"
            placeholder="Enter your complaint ID"
          />

          <button type="submit">
            Track Complaint
          </button>
        </form>
       {showResult && ( <div className="complaint-result">

  <div className="result-header">
    <div>
      <p className="result-label">Complaint ID</p>
      <h3>{complaint?.complaintId}</h3>      
    </div>

    <span className="status-badge">
     {complaint?.status}
    </span>
  </div>

  <h3 className="complaint-title">
    {complaint?.title}
  </h3>

  <div className="complaint-info">
    <p>
      <strong>Category:</strong> {complaint?.category}
    </p>

    <p>
      <strong>Location:</strong>{complaint?.location}
    </p>

    <p>
      <strong>Reported on:</strong> {" "}
      {new 
      Date(complaint.createdAt).toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      })
      }
    </p>

    <p>
      <strong>Last updated:</strong> {" "}
      {new 
      Date(complaint.updatedAt).toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      })
      }
    </p>
  </div>
  
  <div className="status-section">
    <h3>Complaint Status</h3>

    {/* <div className="status-timeline">
      <div className="status-step completed">
        <span>✓</span>
        <p>Reported</p>
      </div>  

      <div className="status-line"></div>

      <div className="status-step completed">
        <span>✓</span>
        <p>Assigned</p>
      </div>

      <div className="status-line"></div>

      <div className="status-step active">
        <span>●</span>
        <p>In Progress</p>
      </div>

      <div className="status-line"></div>

      <div className="status-step">
        <span>○</span>
        <p>Resolved</p>
      </div> */}
    {/* </div> */}
    <div className="status-timeline">
  {statusSteps.map((status, index) => (
    <React.Fragment key={status}>
      <div
        className={`status-step ${
          index < currentStatusIndex
            ? "completed"
            : index === currentStatusIndex
            ? "active"
            : ""
        }`}
      >
        <div className="status-circle">
          {index < currentStatusIndex ? "✓" : ""}
        </div>

        <p>
          {status === "Pending"
            ? "Reported"
            : status}
        </p>
      </div>

      {index < statusSteps.length - 1 && (
        <div
          className={`status-line ${
            index < currentStatusIndex
              ? "completed"
              : ""
          }`}
        ></div>
      )}
    </React.Fragment>
  ))}
</div>
  </div>

</div>
)}
      </div>
    </div>
  );
};

export default TrackComplaint;
