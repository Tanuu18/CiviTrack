import React from 'react'
import civicImage from "../assets/civic2.png";
import{ Box ,Button}from "@mui/material";
import "./Hero.css";
import {FilePenLine,Search} from "lucide-react";
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div>
      <Box className="hero">
        <Box className="hero-text">
                 <h1>Report.<br/> <span className="track2">Track.</span><br/> Resolve.</h1>
                 <p> 
                 CIVI<span className="track2">TRACK</span> empowers citizens to report civic issues <br/>
                 with photo and location, track their progress<br/>
                    and help get them resolved faster.
                 </p>
                 <Box className="hero-buttons">
           <Link to="report-issue" style={{textDecoration:"none"}}>
               <Button className='report'><FilePenLine size={18}/>Report an Issue</Button>
           </Link>
           <Link to="track-complaint"  style={{textDecoration:"none"}}>
           <Button variant="outlined"
            className='complaint'><Search  size={18}/>Track Complaint</Button>
              </Link> 
            </Box>        
        </Box> 
        <Box className="hero-image">
          <img src={civicImage} alt="civic"/> 
        </Box>
        
      </Box>
    </div>
  )
}

export default Hero
