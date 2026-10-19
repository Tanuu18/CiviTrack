import React from 'react'
import "./AboutUs.css"
import AboutImage from "../assets/about.png"
import { Button, TextField } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import GroupsIcon from "@mui/icons-material/Groups"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import VisibilityIcon from "@mui/icons-material/Visibility"

import { FileWarning,CircleCheck,TrendingUp,Users,Mail,Phone,MapPin } from 'lucide-react'
const AboutUs = () => {
  return (
    <>
    <div className='about-page'>
        <section className='about-hero'>
        <div className='about-hero-content'>
           <span className="about-label">ABOUT US</span>
      <h1>About <span>CiviTrack</span></h1>
      <h2>Making cities better, one reported<br/> issue at a time</h2>
      <p>CiviTrack is a citizen-focused platform that empowers people<br/>
      to report civic issues in their area and track their progress<br/>
      in real time, Together, we can build cleaner, safer and more<br/>
      livable cities for everyone.   
      </p> 
      <Button className="report-btn">Report an Issue<ArrowRight/></Button>
      
        </div>
        <div className='about-hero-image'>
            <img src={AboutImage} alt="about"/> 
        </div>
       </section>
       <section className="what-section">
        <h2>What is <span>CiviTrack</span>?</h2>  
        <p>CiviTrack connects citizens and local authorities to identify,report and 
            resolve civic issues<br/>
             efficiently and transparently</p> 
             <div className="what-cards three-cards">
              <div className="what-card">
                <div className="card-icon"><AssignmentTurnedInIcon/></div>
                <h3>Report Issues</h3>
                <p>Easily report civic problems like <br/>
                potholes, garbage overflow,
                  water<br/> leakage, broken lights and more.
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><TrackChangesIcon/></div>
                <h3>Track Progress</h3>
                <p>Track the status of reported issues<br/> in real-time from submission<br/>
                   to resolution.
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><GroupsIcon/></div>
                <h3>Better Cities</h3>
                <p>Your reports help authorities take<br/> action and make our
                  cities better<br/> for everyone.
                </p>
              </div>
             </div>
       </section> 
      {/* how civitrack helps */}
       <section className="what-section">
        <h2>How<span>CiviTrack</span>Helps</h2>  
        <p>CiviTrack connects citizens and local authorities to identify,report and 
            resolve civic issues<br/>
             efficiently and transparently</p> 
             <div className="what-cards four-cards">
              <div className="what-card">
                <div className="card-icon">
                  <AssignmentTurnedInIcon/>
                </div>
                <h3>Easy Reporting</h3>
                <p>Report civic issues in just <br/>
                a few clicks with location<br/> and details.</p>
              </div>
              <div className="what-card">
                <div className="card-icon"><LocationOnIcon/></div>
                <h3>Location Based</h3>
                <p>
                  Pinpoint the exact location<br/> of issues so authorities<br/>
                  can identify them quickly.
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><VisibilityIcon/></div>
                <h3>Transparent Tracking</h3>
                <p>
                  Stay updated with real-time<br/> status updates: Reported,<br/>In Progress or Resolved.
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><GroupsIcon/></div>
                <h3>Community Driven</h3>
                <p>
                  Every report makes a <br/>difference.Together we<br/> create better cities.
                </p>
              </div>
             </div>
       </section> 
       {/* stats section */}
       <section className='stats-section'>
        <div className='stat-box'>
          <FileWarning className="stat-icon"/>
          <h2>1,250</h2>
          <p>Issues Reported</p>
        </div>
        <div className='stat-box'>
          <CircleCheck className="stat-icon"/>
          <h2>980</h2>
          <p>Issues Resolved</p>
        </div>
        <div className='stat-box'>
          <TrendingUp className="stat-icon"/>
          <h2>65%</h2>
          <p>Avg. Resolution Rate</p>
        </div>
        <div className='stat-box'>
          <Users className="stat-icon"/>
          <h2>5000</h2>
          <p>Active Citizens</p>
        </div>

        {/* get in touch */}
       </section>
       <section className='contact-section'>
         <h2>Get in Touch</h2>
        <div className="contact-info">
          <span className="about-label">CONTACT US</span>
        
        <p>Have questions, suggestions or feedback?<br/>
        we'd love to hear from you.</p>
        <div className="contact-item">
          <Mail/>
          <span>civitrack@gmail.com</span>
        </div>
        <div className="contact-item">
          <Phone/> 
          <span>+91 XXXXX XXXXX</span>
        </div>
        <div className="contact-item">
          <MapPin/>
          <span>City,India</span>
        </div>
        </div>
         
        <div className="contact-form">
           
          <h3>Send us a message</h3>
          <div className="form-row">
                <input type="text" placeholder='Your Name'/>
          <input  type="email" placeholder='Your Email'/>
          </div>
         
          <textarea placeholder='Your Message' rows='5' />
          <Button  className='send-btn'>Send Message</Button>
        </div> 
       </section>
    </div>
    </>
  )
} 

export default AboutUs
