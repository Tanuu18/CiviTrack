import React,{useState,useEffect} from "react";
import "./AddOfficer.css";
import api from "../utils/axios";
import {Check,X,UserRound,Mail,Phone,Building2,BriefcaseBusiness,BadgeCheck,MapPin,LockKeyhole} from "lucide-react";
const AddOfficer = () => {
  const [toast,setToast]=useState(null);
  useEffect(()=>{
    if(!toast) return;
    const timer=setTimeout(()=>{
      setToast(null);
    },3000);
    return ()=>clearTimeout(timer);
  },[toast]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const name=formData.get("name");
    const email=formData.get("email");
    const phone=formData.get("phone");
    const department=formData.get("department");
    const designation=formData.get("designation");
    const officerId=formData.get("officerId");
    const area=formData.get("area");
    const password=formData.get("password");
    try {
      const response=await  api.post("/auth/create-officer",{
        name,
        email,
        phone,
        department,
        designation,
        officerId,
        area,
        password
      });
      console.log(response.data);
      setToast({
        type:"success",
        message:"Officer created successfully"
      });
      e.target.reset();
      
    } catch (error) {
       console.log("CREATE OFFICER ERROR:",error.response?.data);
        setToast({
          type:"error",
          message:error.response?.data?.message|| "Failed to create officer"
        });
    }
  }
  return (
    <>
    {toast && (
      <div className={`toast ${toast.type}`}>
      <span>
      {toast.type==="success"?<Check size={18}/>:<X size={18}/>}
      </span>
      {toast.message}
      </div>
    )}
    <div className="add-officer-page">
      <h1>Add Officer</h1>
         <p className="add-officer-subtitle">Create an official officer account for CiviTrack.</p>
      <form className="officer-form" onSubmit={handleSubmit}>
        <div className="form-grid">
        {/* <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" />
        </div> */}
          <div className="form-group">
          <label>Name</label>

         <div className="officer-input-wrapper">
           <UserRound className="officer-input-icon" />

             <input
                 type="text"
                 name="name"
                placeholder="Enter officer name"
                />
             </div>
           </div>
          <div className="form-group">
            <label>Official Email</label>
            {/* <input type="email" name="email" placeholder="Enter official email"/> */}
            <div className="officer-input-wrapper">
  <Mail className="officer-input-icon" />
  <input
    type="email"
    name="email"
    placeholder="Enter official email"
  />
</div>
          </div>
        <div className="form-group">
          <label>Phone</label>
          <div className="officer-input-wrapper">
  <Phone className="officer-input-icon" />
  <input type="text" name="phone" />
</div>
          {/* <input type="text" name="phone" /> */}
        </div>

        <div className="form-group">
          <label>Department</label>
          {/* <input type="text" name="department" /> */}
          <div className="officer-input-wrapper">
  <Building2 className="officer-input-icon" />
  <input type="text" name="department" />
</div>
        </div>

        <div className="form-group">
          <label>Designation</label>
          {/* <input type="text" name="designation" /> */}
          <div className="officer-input-wrapper">
  <BriefcaseBusiness className="officer-input-icon" />
  <input type="text" name="designation" />
</div>
        </div>

        <div className="form-group">
          <label>Officer ID</label>
          {/* <input type="text" name="officerId" /> */}
          <div className="officer-input-wrapper">
  <BadgeCheck className="officer-input-icon" />
  <input type="text" name="officerId" />
</div>
        </div>

        <div className="form-group">
          <label>Area / Ward</label>
          {/* <input type="text" name="area" /> */}
          <div className="officer-input-wrapper">
  <MapPin className="officer-input-icon" />
  <input type="text" name="area" />
</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          {/* <input type="password" name="password" /> */}
          <div className="officer-input-wrapper">
  <LockKeyhole className="officer-input-icon" />
  <input type="password" name="password" />
</div>
        </div>
          </div>
        <button className="create-officer-btn" type="submit">Create Officer</button>
        
      </form>
    </div>
    </>
  );
};

export default AddOfficer;