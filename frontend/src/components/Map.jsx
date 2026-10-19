import React from 'react'
import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({complaints=[]}) => {

  const firstComplaint = complaints.find(
  (complaint) =>
    typeof complaint.latitude === "number" &&
    typeof complaint.longitude === "number"
);

const mapCenter = firstComplaint
  ? [firstComplaint.latitude, firstComplaint.longitude]
  : [28.6139, 77.2090];
  return (
    <div className='map-wrapper'> 
      <MapContainer center={mapCenter} zoom={13} key={`${mapCenter[0]}-${mapCenter[1]}`}
      className="issues-map"> 
        <TileLayer attribution='&copy; 
         OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> 
       
      
{complaints.map((complaint) => {
  if (
    typeof complaint.latitude !== "number" ||
    typeof complaint.longitude !== "number"
  ) {
    return null;
  }
 
  return (
    <Marker
      key={complaint._id}
      position={[
        complaint.latitude,
        complaint.longitude
      ]}
    >
      <Popup>      
        <strong>{complaint.title}</strong>
        <br />
        {complaint.location}
        <br />
        Status: {complaint.status}
      </Popup>
    </Marker>
  );
})}
  </MapContainer> 
    </div>      
  )        
}         

export default Map
