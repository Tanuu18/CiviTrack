import React,{useState} from 'react'
import "./ReportIssue.css"
import api from '../utils/axios';
import { Check ,X} from 'lucide-react';
import { useTranslation } from 'react-i18next';
const ReportIssue = () => {
  const {t}=useTranslation();
  const [submittedComplaint,setSubmittedComplaint]=useState(null);
  const [toast,setToast]=useState(null);
   const [coordinates,setCoordinates]=useState(null);
   const [locationLoading,setLocationLoading]=useState(false);
   const [locationError,setLocationError]=useState("");
   const [image,setImage]=useState(null);
   const [imagePreview,setImagePreview]=useState("");
    const [location,setLocation]=useState("");
       const handleSubmit=async(e)=>{
        e.preventDefault();

const form = e.target;
const title = form.querySelector('[name="title"]').value;
const category = form.querySelector('[name="category"]').value;
const description = form.querySelector('[name="description"]').value;
const location = form.querySelector('[name="location"]').value;

const latitude = coordinates?.latitude;
const longitude = coordinates?.longitude;
        // const formData=new FormData(e.target);           
        // const title=formData.get("title");
        // const category=formData.get("category"); 
        // const description=formData.get("description");
        // const location=formData.get("location");
        // const latitude=coordinates?.latitude;        
        // const longitude=coordinates?.longitude;
        const formData=new FormData();           
         formData.append("title",title);
          formData.append("category",category); 
          formData.append("description",description);
         formData.append("location",location);
         formData.append("latitude",latitude ?? "");      
         formData.append("longitude",longitude ?? ""); 
         if(image){
          formData.append("image",image);
         }       
       
        try {
          // const response=await api.post("/complaints",{
          //   title,category,description,location,latitude,longitude
          // });
          const response=await api.post("/complaints",formData); 
          console.log(response.data.complaint.complaintId);
          setSubmittedComplaint(response.data.complaint);
          setToast({    
            type:"success", 
            message:`Here's your Complaint ID:${response.data.complaint.complaintId}.
            Use this ID to track the status of your complaint.Keep it safe.`
          }) 
        } catch (error) {
          console.log(error.response?.data); 
        }                          
       }

       //map
       const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    setLocationError("Your browser does not support location.");
    return;
  }

  setLocationLoading(true);
  setLocationError("");

  navigator.geolocation.getCurrentPosition(
    
async (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  setCoordinates({ latitude, longitude });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch address");
    }

    const data = await response.json();

    setLocation(
      data.display_name || `${latitude}, ${longitude}`
    );
  } catch (error) {
    console.log(error);
    
    setLocation(`${latitude}, ${longitude}`);
  } finally {
    setLocationLoading(false);
  }
},

    // (position) => {
    //   const latitude = position.coords.latitude;
    //   const longitude = position.coords.longitude;

    //   setCoordinates({ latitude, longitude });
    //   setlocation(`${latitude},${longitude}`);
    //   setLocationLoading(false);
    // },
    (error) => {
      setLocationLoading(false);
      setLocationError(                    
        error.code === 1
          ? "Location permission denied. You can enter the location manually."
          : "Unable to get your location. Please try again or enter it manually."
      );
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};
  return (                
    
    <div className="report-page">   
      {toast && (
        <div className={`toast ${toast.type}`}> 
          <span><Check size={18}/></span>
          <div className='toast-message'>{toast.message}</div>
          
          <button className='toast-close' onClick={()=>setToast(null)}><X size={18}/></button>
          </div>
      )}
       <div className='report-container'>
        <h1>{t("reportTitle")}</h1>
        <p className="report-subtitle">
            {t("reportSubtitle")}
        </p>
        <form onSubmit={handleSubmit}>
            <label>{t("issueTitle")}</label>
            <input type="text" name="title" placeholder={t("issueTitlePlaceholder")}/>
            <label>{t("category")}</label>
            <select name="category">
                <option value="">{t("selectCategory")}</option>
                <option value="Roads">{t("roads")}</option>
                <option value="Garbage">{t("garbage")}</option>  
                <option value="Street-Light">{t("streetLight")}</option>
                <option value="Water Supply">{t("waterSupply")}</option> 
                <option value="Potholes">{t("track2.titles.Potholes")}</option> 
            </select>              
            <label>{t("description")}</label>
            <textarea name="description" placeholder={t("descriptionPlaceholder")} rows="5"></textarea>
            <label>{t("location")}</label>
            <input name="location"
             type="text"
             value={location} 
             onChange={(e)=>{
              setLocation(e.target.value);
              setCoordinates(null);
              setLocationError("");
             } 
            }
             
              placeholder={t("locationPlaceholder")}/>
              
<button
  type="button"
  onClick={getCurrentLocation}
  disabled={locationLoading}
>
  {locationLoading
    ?t( "gettingLocation")
    : t("useCurrentLocation")}
</button>

{locationError && (
  <p style={{ color: "red" }}>
    {locationError}
  </p>
)}

{coordinates && (
  <p>
    Latitude: {coordinates.latitude},
    Longitude: {coordinates.longitude}
  </p>
)}
<label>{t("uploadImage")}</label>
            
            {/* <input type="file" accept="image/*"/>   */}
            
<input
  type="file"
  name="image"
  accept="image/*"
  onChange={(e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      if (!selectedImage.type.startsWith("image/")) {
        setToast({
          type: "error",
          message: "Please select a valid image.",
        });
        e.target.value = "";
        return;
      }

      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  }}
/>

{imagePreview && (
  <div className="image-preview-container">
    <p>{t("imagePreview")}</p>

    <img
      src={imagePreview}
      alt="Complaint preview"
      className="complaint-image-preview"
    />

    <button
      type="button"
      onClick={() => {
        URL.revokeObjectURL(imagePreview);
        setImage(null);
        setImagePreview("");
      }}
    >
     {t("removeImage")}
    </button>
  </div>
)}
            <button type="submit">{t("submitComplaint")}</button> 
        </form>
       </div>
    </div>
  )
}

export default ReportIssue
