import React from 'react'
import "./Footer.css"
import {Phone,Mail,MapPin,Copyright} from "lucide-react"
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import LocationCityIcon from "@mui/icons-material/LocationCity";
const Footer = () => {
  return (
    <div>
      <footer className='footer'>
        <div className='footer-container'>
            {/* about civitrack */}
            <div className="footer-about">
                <div className="footer-logo">
                     <Box sx={{
            width:"42px",
            height:"42px",
            backgroundColor:"#0f9d58",
            borderRadius:"50% 50% 50% 0",
            transform:"rotate(-45deg)",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        }}>
        <LocationCityIcon sx={{
            color:"white",
            fontSize:"25px",
            transform:"rotate(45deg)",
        }}/>
        </Box>
                <h2>
                    CIVI<span>TRACK</span>
                </h2>
                </div>
                <p>Building better cities through <br/>citizen participation and <br/>transparent tracking.</p>
                <p className='copyright'>
                    <Copyright/>
                    2024 CiviTrack, All rights reserved.
                </p>
            </div>
            {/* quick lines */}
            <div className='footer-column'>
                <h3>Support</h3>
                <p>FAQ</p>
                <p>Contact Us</p>
                <p>Privacy Policy</p>
                <p>Terms & Conditions</p>
            </div>

            <div className='footer-column'>
                <h3>Quick Links</h3>
                <p>Home</p>
                <p>How It Works</p>
                <p>Issues</p>
                <p>About Us</p>
            </div>
            {/* contact us */}
            <div className='footer-column'>
                <h3>Contact Us</h3>
                <p><Mail/>civitrack@gmail.com</p>
                <p><Phone/>+91 37736 xxxxx</p>
                <p><MapPin/>Your City,India</p>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
