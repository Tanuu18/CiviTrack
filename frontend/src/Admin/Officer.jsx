import React,{useState,useEffect} from "react";
import "./Officer.css";
import api from "../utils/axios";
import { Check,X } from "lucide-react";
const Officers = () => {
    const [officers,setofficers]=useState([]);
    const [editingOfficer,setEditingOfficer]=useState(null);
    const [toast,setToast]=useState(null);
    const [searchTerm,setSearchTerm]=useState("");
    const [selectedArea, setSelectedArea] = useState("All Areas");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [deleteOfficerId, setDeleteOfficerId] = useState(null);
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
    useEffect(() => {
  if (!toast) return;

  const timer = setTimeout(() => {
    setToast(null);
  }, 3000);

  return () => clearTimeout(timer);
}, [toast]);
    const handleUpdateOfficer = async () => {
  try {
    const response = await api.put(
      `/auth/officers/${editingOfficer._id}`,
      {
        name: editingOfficer.name,
        email: editingOfficer.email,
        phone: editingOfficer.phone,
        department: editingOfficer.department,
        designation: editingOfficer.designation,
        officerId: editingOfficer.officerId,
        area: editingOfficer.area,
      }
    );

    const updatedOfficer = response.data.officer;

    setofficers((prev) =>
      prev.map((officer) =>
        officer._id === updatedOfficer._id
          ? updatedOfficer
          : officer
      )
    );

    setEditingOfficer(null);
    setToast({type:"success",message:"Officer updated successfully!"});

  } catch (error) {
    console.log("Update Officer Error:", error);
    // alert(error.response?.data?.message || "Failed to update officer");
    setToast({
  type: "error",
  message: error.response?.data?.message || "Failed to update officer",
});
  } 
};
const handleDeleteOfficer = async (officerId) => {
  // const confirmDelete = window.confirm(
  //   "Are you sure you want to delete this officer?"
  // );

  // if (!confirmDelete) return;

  try {
    const response = await api.delete(
      `/auth/officers/${officerId}`
    );

    setofficers((prev) =>
      prev.filter((officer) => officer._id !== officerId)
    );

    setToast({
      type: "success",
      message: response.data.message,
    });

  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data || error);
    setToast({
      type: "error",
      message:
        error.response?.data?.message || "Failed to delete officer",
    });
  }
};
const filteredOfficers = officers.filter((officer) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    officer.name?.toLowerCase().includes(search) ||
    officer.email?.toLowerCase().includes(search) ||
    officer.officerId?.toLowerCase().includes(search);

  const matchesDepartment =
    selectedDepartment === "All Departments" ||
    officer.department === selectedDepartment;

  const matchesArea =
    selectedArea === "All Areas" ||
    officer.area === selectedArea;

  return matchesSearch && matchesDepartment && matchesArea;
});

  return (
    <div className="officers-page">
      {toast && (
      <div className={`toast ${toast.type}`}>
        <span>
          {toast.type === "success"
            ? <Check size={18} />
            : <X size={18} />}
        </span>
        {toast.message}
      </div>
    )}

        {editingOfficer && (
  <div className="edit-officer-overlay">
     <div className="edit-officer-modal">
       <div className="edit-officer-header">
    <h3>Edit Officer</h3>
     <button
          type="button"
          className="edit-close-btn"
          onClick={() => setEditingOfficer(null)}
        >
          <X size={20} />
        </button>
        </div>
    <input
      type="text"
      value={editingOfficer.name || ""}
      placeholder="Name"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          name: e.target.value,
        })
      }
    />

    <input
      type="email"
      value={editingOfficer.email || ""}
      placeholder="Email"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          email: e.target.value,
        })
      }
    />

    <input
      type="text"
      value={editingOfficer.phone || ""}
      placeholder="Phone"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          phone: e.target.value,
        })
      }
    />

    <input
      type="text"
      value={editingOfficer.department || ""}
      placeholder="Department"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          department: e.target.value,
        })
      }
    />

    <input
      type="text"
      value={editingOfficer.designation || ""}
      placeholder="Designation"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          designation: e.target.value,
        })
      }
    />

    <input
      type="text"
      value={editingOfficer.officerId || ""}
      placeholder="Officer ID"
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          officerId: e.target.value,
        })
      }
    />

    <input
      type="text"
      value={editingOfficer.area || ""}   
      placeholder="Area / Ward" 
      onChange={(e) =>
        setEditingOfficer({
          ...editingOfficer,
          area: e.target.value,
        })
      }
    />
    <div className="edit-officer-actions">
  <button onClick={handleUpdateOfficer}>
    Save Changes
  </button>

  <button onClick={() => setEditingOfficer(null)}>
    Cancel
  </button>
  </div>
  </div>

  </div>
)}
      <h1>Officers</h1>
      <p className="officers-subtitle">
        Manage all registered officers
      </p>

      <div className="officers-toolbar">
        <input
          type="text"
          placeholder="Search officers by name, email or officer ID..."
         value={searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}
        />

        {/* <select  
         value={selectedDepartmet}  
         onChange
        >
          <option>All Departments</option>
          <option>Public Works</option>
          <option>Water Supply</option>
          <option>Sanitation</option>
          <option>Electricity</option>
        </select> */}
          <select
  value={selectedDepartment}
  onChange={(e) => setSelectedDepartment(e.target.value)}
>
  <option value="All Departments">All Departments</option>
  <option value="Public Works">Public Works</option>
  <option value="Water Supply">Water Supply</option>
  <option value="Sanitation">Sanitation</option>
  <option value="Electricity">Electricity</option>
</select>

        
      </div>
         <div className="officers-grid">
  {filteredOfficers.map((officer) => (
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
          {/* <button>View</button> */}
          <button onClick={()=>setEditingOfficer(officer)}>Edit</button>
          <button onClick={() => setDeleteOfficerId(officer._id)}>
                  Delete
              </button>
        </div> 
      </div>

    </div>
  ))}
</div>
{deleteOfficerId && (
  <div className="delete-confirm-overlay">
    <div className="delete-confirm-modal">

      <h3>Delete Officer?</h3>

      <p>
        Are you sure you want to delete this officer?
        This action cannot be undone.
      </p>

      <div className="delete-confirm-actions">
        <button
          onClick={() => setDeleteOfficerId(null)}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={() => {
            const id = deleteOfficerId;
            setDeleteOfficerId(null);
            handleDeleteOfficer(id);
          }}
        >
          Delete Officer
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default Officers;
