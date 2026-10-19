
import { BrowserRouter, Routes, Route, useLocation,Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./pages/HowItWorks";
import Issues from "./pages/Issues";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReportIssue from "./pages/ReportIssue";
import TrackComplaint from "./pages/TrackComplaint";
import OfficerSidebar from "./components/OfficerSidebar";
import OfficerDashboard from "./pages/OfficerDashboard";
import OfficerProfile from "./pages/OfficerProfile";
import OfficerComplaints from "./pages/OfficerComplaints";
//import OfficerNotifications from "./pages/OfficerNotifications";
import AdminSidebar from "./Admin/AdminSidebar";
import AdminLayout from "./Admin/AdminLayout";
import AddOfficer from "./Admin/AddOfficer";
import Officer from "./Admin/Officer";
import AdminDashboard from "./Admin/AdminDashboard";
function OfficerLayout() {  
  return (
    <div className="officer-layout">
      <OfficerSidebar /> 

      <div className="officer-content">
        <Outlet />
      </div>
    </div>
  );
}
 
function AppContent() {
  const location = useLocation();

  return (
    <div className="app">
      {
      location.pathname!=="/register" && 
      location.pathname!=="/login" && location.pathname!=="/officer" && 
      location.pathname!=="/officer/complaints" &&
      location.pathname!=="/officer/profile"  && 
      location.pathname!=="/admin/officers" && location.pathname!=="/admin/dashboard" &&
       <Navbar />
      }
      <main className="main-content">
        <Routes> 
          <Route path="/" element={<Hero />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/report-issue" element={<ReportIssue/>}/>
          <Route path="/track-complaint" element={<TrackComplaint/>}/>
          <Route path="/officer" element={<OfficerLayout/>}>
          <Route index element={<OfficerDashboard/>}/>
          <Route path="complaints" element={<OfficerComplaints/>}/>
          <Route path="profile" element={<OfficerProfile/>}/>
          {/* <Route path="notifications" element={<OfficerNotifications/>}/> */}
       </Route>
       <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminSidebar/>}/>
        <Route path="add-officer" element={<AddOfficer/>}/>
        <Route path="officers" element={<Officer/>}/>
     <Route path="dashboard" element={<AdminDashboard/>}/>
        </Route>
        </Routes> 
      </main>      

      {location.pathname !== "/" && 
      location.pathname!=="/register" && 
      location.pathname!=="/login" && location.pathname!=="/officer" && 
       location.pathname!=="/officer/complaints" &&
      location.pathname!=="/officer/profile" && location.pathname!=="/admin" &&
     location.pathname!=="/admin/officers" && location.pathname!=="/admin/dashboard" &&
     <Footer />}    
    </div> 
  );
} 

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;