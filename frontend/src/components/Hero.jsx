import React from 'react'
import civicImage from "../assets/civic2.png";
import{ Box ,Button}from "@mui/material";
import "./Hero.css";
import {FilePenLine,Search} from "lucide-react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Hero = () => {
  const {t,i18n}=useTranslation();
  return (
    <div>
      <Box className="hero">
        <Box className="hero-text">
                 
                 <h1>
  {i18n.language === "en" ? (
    <>
      Report, <span className="track2">Track!</span>
      <br /> Resolve
    </>
  ) : (
    t("heroTitle")
  )}
</h1>
                 <p>{t("heroDescription")}</p>
                 <Box className="hero-buttons">
           <Link to="report-issue" style={{textDecoration:"none"}}>
               <Button className='report'><FilePenLine size={18}/>{t("reportButton")}</Button>
           </Link>
           <Link to="track-complaint"  style={{textDecoration:"none"}}>
           <Button variant="outlined"
            className='complaint'><Search  size={18}/>{t("trackButton")}</Button>
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
