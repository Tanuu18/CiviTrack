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
import { useTranslation } from 'react-i18next'
import { FileWarning,CircleCheck,TrendingUp,Users,Mail,Phone,MapPin } from 'lucide-react'
const AboutUs = () => {
  const {t}=useTranslation();
  return (
    <>
    <div className='about-page'>
        <section className='about-hero'>
        <div className='about-hero-content'>
           <span className="about-label">{t("about.label")}</span>
      <h1>{t("about.title")}</h1>
      <h2>{t("about.tagline")}</h2>
      
      <p>{t("about.description")} </p>
      <Button className="report-btn">{t("about.reportButton")}<ArrowRight/></Button>
      
        </div>
        <div className='about-hero-image'>
            <img src={AboutImage} alt="about"/> 
        </div>
       </section>
       <section className="what-section">
        <h2>{t("about.whatIsTitle")}</h2>  
        
             <p>{t("about.whatIsDescription")}</p>
             <div className="what-cards three-cards">
              <div className="what-card">
                <div className="card-icon"><AssignmentTurnedInIcon/></div>
                <h3>{t("about.reportIssues")}</h3>
                <p>{t("about.reportIssuesDescription")}
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><TrackChangesIcon/></div>
                <h3>{t("about.trackProgress")}</h3>
                <p>{t("about.trackProgressDescription")}
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><GroupsIcon/></div>
                <h3>{t("about.betterCities")}</h3>
                <p>{t("about.betterCitiesDescription")}
                </p>
              </div>
             </div>
       </section> 
      {/* how civitrack helps */}
       <section className="what-section">
        <h2>{t("about.howItHelpsTitle")}</h2>  
        <p>{t("about.howItHelpsDescription")}
</p> 
             <div className="what-cards four-cards">
              <div className="what-card">
                <div className="card-icon">
                  <AssignmentTurnedInIcon/>
                </div>
                <h3>{t("about.easyReporting")}</h3>
                <p>{t("about.easyReportingDescription")}</p>
              </div>
              <div className="what-card">
                <div className="card-icon"><LocationOnIcon/></div>
                <h3>{t("about.locationBased")}</h3>
                <p>
                  {t("about.locationBasedDescription")}
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><VisibilityIcon/></div>
                <h3>{t("about.transparentTracking")}</h3>
                <p>
                  {t("about.transparentTrackingDescription")}
                </p>
              </div>
              <div className="what-card">
                <div className="card-icon"><GroupsIcon/></div>
                <h3>{t("about.communityDriven")}</h3>
                <p>
                  {t("about.communityDrivenDescription")}
                </p>
              </div>
             </div>
       </section> 
       {/* stats section */}
       <section className='stats-section'>
        <div className='stat-box'>
          <FileWarning className="stat-icon"/>
          <h2>1,250</h2>
          <p>{t("about.stats.issuesReported")}</p>
        </div>
        <div className='stat-box'>
          <CircleCheck className="stat-icon"/>
          <h2>980</h2>
          <p>{t("about.stats.issuesResolved")}</p>
        </div>
        <div className='stat-box'>
          <TrendingUp className="stat-icon"/>
          <h2>65%</h2>
          <p>{t("about.stats.resolutionRate")}</p>
        </div>
        <div className='stat-box'>
          <Users className="stat-icon"/>
          <h2>5000</h2>
          <p>{t("about.stats.activeCitizens")}</p>
        </div>

        {/* get in touch */}
       </section>
       <section className='contact-section'>
         <h2>{t("about.getInTouch")}</h2>
        <div className="contact-info">
          <span className="about-label">{t("about.contactLabel")}</span>
        
        <p>{t("about.contactDescription")}</p>
        <div className="contact-item">
          <Mail/>
          <span>{t("about.email")}</span>
        </div>
        <div className="contact-item">
          <Phone/> 
          <span>{t("about.phone")}</span>
        </div>
        <div className="contact-item">
          <MapPin/>
          <span>{t("about.location")}</span>
        </div>
        </div>
         
        <div className="contact-form">
           
          <h3>{t("about.sendMessage")}</h3>
          <div className="form-row">
                <input type="text" placeholder={t("about.yourName")}/>
          <input  type="email" placeholder={t("about.YourEmail")}/>
          </div>
         
          <textarea placeholder={t("about.yourMessage")} rows='5' />
          <Button  className='send-btn'>{t("about.sendButton")}</Button>
        </div> 
       </section>
    </div>
    </>
  )
} 

export default AboutUs
