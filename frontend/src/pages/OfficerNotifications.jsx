import React from "react";
import "./OfficerNotifications.css";
import Pagination from "@mui/material/Pagination";
const OfficerNotifications = () => {
  return (
    <div className="officer-notifications">

      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with the latest updates and activities</p>
        </div>

        <button className="mark-read-btn">
          ✓ Mark all as read
        </button>
      </div>

      <div className="notification-filters">
        <button className="filter-btn active">All (8)</button>
        <button className="filter-btn">New Complaints (3)</button>
        <button className="filter-btn">Assignment (2)</button>
        <button className="filter-btn">Status Update (2)</button>
        <button className="filter-btn">Reminders (1)</button>
      </div>
         <div className="notifications-list">

  <div className="notification-card unread">
    <div className="notification-icon complaint-icon">📄</div>

    <div className="notification-content">
      <h3>New Complaint Assigned <span>New</span></h3>
      <p>
        A new complaint (CT-2026-1045) has been assigned to you
        regarding road damage in Ward 12.
      </p>
    </div>

    <div className="notification-time">
      <span>10 mins ago</span>
      <b></b>
      <strong>›</strong>
    </div>
  </div>


  <div className="notification-card unread">
    <div className="notification-icon update-icon">👤</div>

    <div className="notification-content">
      <h3>Complaint Status Updated <span>New</span></h3>
      <p>
        The complaint (CT-2026-1038) in Ward 8 has been marked as
        In Progress.
      </p>
    </div>

    <div className="notification-time">
      <span>1 hour ago</span>
      <b></b>
      <strong>›</strong>
    </div>
  </div>


  <div className="notification-card unread">
    <div className="notification-icon resolved-icon">✓</div>

    <div className="notification-content">
      <h3>Complaint Resolved <span>New</span></h3>
      <p>
        The complaint (CT-2026-1021) regarding street light has
        been resolved successfully.
      </p>
    </div>

    <div className="notification-time">
      <span>3 hours ago</span>
      <b></b>
      <strong>›</strong>
    </div>
  </div>


  <div className="notification-card">
    <div className="notification-icon reminder-icon">🔔</div>

    <div className="notification-content">
      <h3>Reminder</h3>
      <p>You have 2 pending complaints that need to be updated.</p>
    </div>

    <div className="notification-time">
      <span>5 hours ago</span>
      <strong>›</strong>
    </div>
  </div>


  <div className="notification-card">
    <div className="notification-icon comment-icon">👥</div>

    <div className="notification-content">
      <h3>New Comment</h3>
      <p>
        A new comment has been added to complaint (CT-2026-1040)
        by the citizen.
      </p>
    </div>

    <div className="notification-time">
      <span>1 day ago</span>
      <strong>›</strong>
    </div>
  </div>


  <div className="notification-card">
    <div className="notification-icon complaint-icon">📄</div>

    <div className="notification-content">
      <h3>New Complaint Assigned</h3>
      <p>
        A new complaint (CT-2026-1039) has been assigned to you
        regarding water leakage in Ward 4.
      </p>
    </div>

    <div className="notification-time">
      <span>1 day ago</span>
      <strong>›</strong>
    </div>
    
  </div>
   <div className="pagination">
     <Pagination count={3}  color="primary" shape="rounded" onChange={(event,value)=>setPage(value)}/>
    </div>

</div>
    </div>
  );
};

export default OfficerNotifications;
