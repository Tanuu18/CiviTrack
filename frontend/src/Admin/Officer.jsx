import React,{useState,useEffect} from "react";
import "./Officer.css";
import api from "../utils/axios";

const Officers = () => {
    const [officers,setofficers]=useState([]);
    useEffect(()=>{
        const fetchOfficers=async()=>{
            try {
                const response=await api.get("/auth/officers");
                console.log(response.data);
                setofficers(response.data.officers);
                
            } catch (error) {
                console.log("FETCH OFFICERS ERROR",error.response?.data);
            }
        }
        fetchOfficers();
    },[]);
  return (
    <div className="officers-page">

      <h1>Officers</h1>
      <p className="officers-subtitle">
        Manage all registered officers
      </p>

      <div className="officers-toolbar">
        <input
          type="text"
          placeholder="Search officers by name, email or officer ID..."
        />

        <select>
          <option>All Departments</option>
          <option>Public Works</option>
          <option>Water Supply</option>
          <option>Sanitation</option>
          <option>Electricity</option>
        </select>

        <select>
          <option>All Areas</option>
          <option>Ward 5</option>
          <option>Ward 10</option>
          <option>Ward 15</option>
          <option>Ward 20</option>
        </select>

        <button>+ Add Officer</button>
      </div>
         <div className="officers-grid">
  {officers.map((officer) => (
    <div className="officer-card" key={officer._id}>

      <div className="officer-card-header">
        <div className="officer-avatar">
          {officer.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{officer.name}</h3>
          <p>{officer.designation}</p>
        </div>
      </div>

      <div className="officer-details">
        <div>
          <span>Officer ID</span>
          <strong>{officer.officerId}</strong>
        </div>

        <div>
          <span>Department</span>
          <strong>{officer.department}</strong>
        </div>

        <div>
          <span>Area</span>
          <strong>{officer.area}</strong>
        </div>

        <div>
          <span>Phone</span>
          <strong>{officer.phone}</strong>
        </div>

        <div>
          <span>Email</span>
          <strong>{officer.email}</strong>
        </div>
      </div>

      <div className="officer-card-footer">
        <span className="officer-status">Active</span>

        <div className="officer-actions">
          <button>View</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>

    </div>
  ))}
</div>
    </div>
  );
};

export default Officers;
