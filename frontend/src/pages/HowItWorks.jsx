import React from 'react'
import "./HowItWorks.css"
import { FileText ,MapPin,Wrench,CheckCircle,ArrowRight,FileCheck,Building2,Hammer,CircleCheck,Hash,RefreshCw} from 'lucide-react'
import civicImage from "../assets/civic4.png"
import parkImage from "../assets/park.png"
import {Button} from "@mui/material"
import { useTranslation } from 'react-i18next'
const HowItWorks = () => {
  const {t,i18n}=useTranslation();  
  return (
    <>
    <div className="how-it-works">
    <div className="how-header">
        <img src={civicImage} alt="city" className='city-image'/>
       
       <h1>
  {t("howTitle")} 
  <span className="track2">{t("track")}</span>
  {t("works")} ?
</h1>
       <p>
        {t("howDescription")}
       </p>
    </div>
    <div className='steps'>
        <div className="step-card">
            <FileText size={32}/>
            <h2>01</h2>
            <h3>{t("reportStep")}</h3> 
            
            <p>{t("reportDescription")}</p>
        </div>
        <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <MapPin size={32}/>
            <h2>02</h2>
            
            <h3>{t("trackStep")}</h3>
            <p>{t("trackDescription")}</p>
        </div>
 <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <Wrench size={32}/>
            <h2>03</h2>
            
            <h3>{t("resolveStep")}</h3>
<p>{t("resolveDescription")}</p>
        </div>
         <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <CheckCircle size={32}/>
            <h2>04</h2>
           
            <h3>{t("verifyStep")}</h3>
<p>{t("verifyDescription")}</p>
        </div>
    </div>
    <div className='report-process'>
        <h2 className='head'>{t("processTitle")}</h2>
        <div className="process-cards">
           <div className='process-card'>
           <div className='process-icon'>
             <FileCheck size={24}/>
           </div>
           
            <p>{t("process1")}</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Hash size={24}/>
           </div>
           
            <p>{t("process2")}</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Building2 size={24}/>
           </div>
            
            <p>{t("process3")}</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Hammer size={24}/>
           </div>
            
            <p>{t("process4")}</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <RefreshCw size={24}/>
           </div>
           
            <p>{t("process5")}</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <CircleCheck size={24}/>
           </div>
           
            <p>{t("process6")}</p>
           </div>
        </div>
    </div>
 <div className="cta-section">
     <div className="cta-image">
        <img src={parkImage} alt="city"/>
     </div>
     <div className="cta-content">
      <h2>{t("ctaTitle")}</h2>
      <p>{t("ctaDescription")}</p>
      <Button>{t("ctaButton")}<ArrowRight/></Button> 
     </div>
    </div> 

    </div>
    </>
  )
}

export default HowItWorks
