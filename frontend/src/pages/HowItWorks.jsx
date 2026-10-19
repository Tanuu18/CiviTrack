import React from 'react'
import "./HowItWorks.css"
import { FileText ,MapPin,Wrench,CheckCircle,ArrowRight,FileCheck,Building2,Hammer,CircleCheck,Hash,RefreshCw} from 'lucide-react'
import civicImage from "../assets/civic4.png"
import parkImage from "../assets/park.png"
import {Button} from "@mui/material"
const HowItWorks = () => {
  return (
    <>
    <div className="how-it-works">
    <div className="how-header">
        <img src={civicImage} alt="city" className='city-image'/>
       <h1 >How CIVI<span className='track2'>TRACK</span> Works</h1>
       <p>
        A simple and transparent way to report, track, and resolve civic issues
       </p>
    </div>
    <div className='steps'>
        <div className="step-card">
            <FileText size={32}/>
            <h2>01</h2>
            <h3>Report</h3>
            <p>
              Spot a civic issue? Submit a complaint with its category
              description, photo and location.
            </p>
        </div>
        <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <MapPin size={32}/>
            <h2>02</h2>
            <h3>Track</h3>
            <p>
               Get a unique Complaint ID and track your complaint status anytime,anywhere.
            </p>
        </div>
 <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <Wrench size={32}/>
            <h2>03</h2>
            <h3>Resolve</h3>
            <p>
                The concerned department takes action to resolve the issue.
            </p>
        </div>
         <ArrowRight className="step-arrow" size={24}/>
        <div className="step-card">
            <CheckCircle size={32}/>
            <h2>04</h2>
            <h3>Verify</h3>
            <p>
               Verify that the reported issue has actually been resolved.
            </p>
        </div>
    </div>
    <div className='report-process'>
        <h2 className='head'>What Happens After You Report an Issue?</h2>
        <div className="process-cards">
           <div className='process-card'>
           <div className='process-icon'>
             <FileCheck size={24}/>
           </div>
           {/* <span className='process-number'>01</span> */}
            {/* <h3>Complaint Submitted</h3> */}
            <p>You submit a complaint.</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Hash size={24}/>
           </div>
            {/* <span className='process-number'>02</span> */}
            {/* <h3>Department Assigned</h3> */}
            <p>Complaint gets a unique ID.</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Building2 size={24}/>
           </div>
            {/* <span className='process-number'>02</span> */}
            {/* <h3>Department Assigned</h3> */}
            <p>Complaint is assigned to the concerned department.</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <Hammer size={24}/>
           </div>
            {/* <span className='process-number'>03</span> */}
            {/* <h3>Action Taken</h3> */}
            <p>Department takes action to resolve the issue.</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <RefreshCw size={24}/>
           </div>
            {/* <span className='process-number'>03</span> */}
            {/* <h3>Action Taken</h3> */}
            <p>Status gets updated.</p>
           </div>
           <ArrowRight className="step-arrow" size={24}/>
           <div className='process-card'>
            <div className='process-icon'>
             <CircleCheck size={24}/>
           </div>
            {/* <span className='process-number'>04</span> */}
            {/* <h3>Issue Resolved</h3> */}
            <p>Issue resolved & citizen verifies.</p>
           </div>
        </div>
    </div>
 <div className="cta-section">
     <div className="cta-image">
        <img src={parkImage} alt="city"/>
     </div>
     <div className="cta-content">
      <h2>Have a Civic Issue?</h2>
      <p>Let's make our city a better place to live.</p>
      <Button>Report an Issue<ArrowRight/></Button> 
     </div>
    </div> 

    </div>
    </>
  )
}

export default HowItWorks
