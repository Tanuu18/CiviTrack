import React,{useState,useEffect} from 'react'
 import "./OfficerDashboard.css"
 import Map from '../components/Map'
 import api from '../utils/axios'

const OfficerDashboard = () => {
  const [complaints,setComplaints]=useState([]);
  const [selectedComplaint,setSelectedComplaint]=useState(null);
  const [activities,setActivities]=useState([]);
  useEffect(()=>{
    const fetchComplaints=async()=>{
      try { 
        const response=await api.get("/complaints/officer");
        console.log(response.data);
        setComplaints(response.data.complaints);
        console.log(response.data.complaints);
        
      } catch (error) {
        console.log(error.response?.data);
        
      }
    }
    fetchComplaints();
    const fetchActivities = async () => {
  try {
    const response = await api.get(
      "/complaints/officer/activities"
    );

    console.log(response.data.complaints);

    setActivities(response.data.activities);
  } catch (error) {
    console.log(
      "FETCH ACTIVITIES ERROR:",
      error.response?.data
    );
  }
};

fetchActivities();
  },[]);
   const getTimeAgo = (date) => {
  const now = new Date();
  const activityDate = new Date(date);

  const diff = now - activityDate;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${days}d ago`;
};
  return ( 
    <div className='officer-dashboard'>
      <div className='dashboard-header'>
        <div>
          <h1>Good Morning, Officer</h1>
          <p>Let's work together for a cleaner and better city.</p>
        </div>
        <div className="dashboard-date">
             {new Date().toLocaleDateString("en-GB",{
              day:"2-digit",
              month:"long",
              year:"numeric"
             })}
        </div>
      </div>
       <div className="stats-container">

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div>
            <h2>{complaints.length}</h2>
            <p>Total Assigned</p>
          </div>
          <span>→</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🕐</div>
          <div>
            <h2>{complaints.filter((complaint)=>
            complaint.status==="Pending").length}</h2>
            <p>Pending</p>
          </div>
          <span>→</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚙️</div>
          <div>
            <h2>{complaints.filter((complaint)=>
            complaint.status==="In Progress").length}</h2>
            <p>In Progress</p>
          </div>
          <span>→</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div>
            <h2>{complaints.filter((complaint)=>
            complaint.status==="Resolved").length}</h2>
            <p>Resolved</p>
          </div>
          <span>→</span>
        </div>

      </div>
          
  <div className="dashboard-content">

    {/* Assigned Complaints */}
    <div className="complaints-section">

        <div className="section-header">
            <h2>Assigned Complaints</h2>
            {/* <span>View All →</span> */}
        </div>

        <table className="complaints-table">
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
  {complaints.map((complaint, index) => (
    <tr key={complaint._id}>
      <td>{index + 1}</td>

      <td>{complaint.complaintId}</td>

      <td>{complaint.title}</td>

      <td>{complaint.category}</td>

      <td>{complaint.location}</td>

      <td>
        {new Date(complaint.createdAt).toLocaleDateString()}
      </td>

      <td>
        <span className={`status ${complaint.status}`}>
          {complaint.status}
        </span>
      </td>

      <td>
        <button
        onClick={()=>setSelectedComplaint(complaint)}  
        >View</button>
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

      <p>
        <strong>Status:</strong>{" "}
        {selectedComplaint.status}
      </p>

      <button
        onClick={() => setSelectedComplaint(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
       <div className="right-section">

   <div className="recent-activity">
      <div className="section-title">
        <h3>Recent Activity</h3>
        <span>View All →</span>
      </div>
      
{activities.length === 0 ? (
  <p>No recent activities yet.</p>
) : (
  activities.slice(0, 4).map((activity) => (
    <div className="activity-item" key={activity._id}>
      <span className="activity-dot"></span>

      <div>
        <p>
          {activity.action === "status_updated"
            ? "You updated a complaint status"
            : activity.action === "complaint_assigned"
            ? "New complaint assigned"
            : activity.action === "COMPLAINT_CREATED"
            ? "New complaint created"
            : activity.action}
        </p>

        <small>
          {activity.complaint?.complaintId}
          {activity.oldStatus && activity.newStatus
            ? ` · ${activity.oldStatus} → ${activity.newStatus}`
            : ""}
        </small>

        <span>
          {getTimeAgo(activity.createdAt)}
        </span>
      </div>
    </div>
  ))
)}
              <div className='your-area'>
                <div className='section-title'>
                  <div>
                    <h3>Your Area</h3>
                    {/* <small>Ward 8, Ward 12</small> */}
                  </div>
                  <span>Change</span>
                </div>
                <div className="area-map">
                  <Map complaints={complaints}/>
                </div>
              </div>
    </div>

  </div>
  <div className="bottom-section">

  <div className="impact-card">
    <div className="impact-icon">◉</div>

    <div>
      <h3>Your Impact</h3>
      <p>
        Every resolved complaint makes the city a little better
        for everyone. Keep going!
      </p>
    </div>
  </div>

  <div className="quote-card">
    <span>“</span>
    <p>A cleaner city is a healthier, happier city.</p>
  </div>

</div>
</div>
    
    </div>
  )
}

export default OfficerDashboard

