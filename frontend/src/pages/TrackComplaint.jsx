import React,{useState} from "react";
import "./TrackComplaint.css";
import api from "../utils/axios";
import { useTranslation } from "react-i18next";
const TrackComplaint = () => {
  const {t}=useTranslation();
  const [showResult,setShowResult]=useState(false);
  const [complaint,setComplaint]=useState(null);
   const [complaintId,setComplaintId]=useState("");
   const statusSteps=[
    "pending",
    "assigned",
    "inProgress",
    "resolved"
  ];
  const statusMap = {
  Pending: "pending",
  Assigned: "assigned",
  "In Progress": "inProgress",
  Resolved: "resolved",
};
  const currentStatusIndex=statusSteps.indexOf(complaint?.status); 

  return (
    <div className="track-page">
      <div className="track-container">

        <h2>{t("track2.title")}</h2>

        <p className="track-subtitle">
          {t("track2.subtitle")}
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
          <label>{t("track2.complaintId")}</label>

          <input
            type="text" name="complaintId"
            placeholder={t("track2.idPlaceholder")}
          />

          <button type="submit">
           {t("track2.trackButton")}
          </button>
        </form>
       {showResult && ( <div className="complaint-result">

  <div className="result-header">
    <div>
      <p className="result-label">{t("track2.complaintId")}</p>
      <h3>{complaint?.complaintId}</h3>      
    </div>

   
    <span className="status-badge">
  {t(
    `track2.status.${
      statusMap[complaint?.status] || "unknown"
    }`
  )}
</span>
  </div>

  
  <h3 className="complaint-title">
  {t(`track2.titles.${complaint?.title}`, {
    defaultValue: complaint?.title
  })}
</h3>

  <div className="complaint-info">
    <p>
     <strong>{t("track2.category")}</strong>{" "}
{t(`track2.categories.${complaint?.category}`, {
  defaultValue: complaint?.category
})}
     
    </p>

    <p>
      <p>
  <strong>{t("track2.location")}</strong>{" "}
  {complaint?.location}
</p>
      
    </p>

    <p>
      <strong>{t("track2.reportedOn")}</strong> {" "}
      {new 
      Date(complaint.createdAt).toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      })
      }
    </p>

    <p>
      <strong>{t("track2.lastUpdated")}</strong> {" "}
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
    <h3>{t("track2.complaintStatus")}</h3>
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
          {status === "pending"
            ? t("track2.reportedOn")
            : t(`track2.status.${status}`)}
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
