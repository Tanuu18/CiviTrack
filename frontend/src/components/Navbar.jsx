import React from 'react'
import {Typography,Button,Box } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./Navbar.css";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
        <Box
        sx={{
            width:"100%",
            backgroundColor:"#ffffff",
            borderBottom:"1px solid #e2e8f0",
        }}
         >
       <Box 
      sx={{
         width:"100%",
         padding:"0 30px",
         boxSizing:"border-box",
         height:"72px",
        display:"flex",
        position:"relative",
        alignItems:"center",
        
      }}
      > 
      <Box sx={{
        display:"flex",alignItems:"center",gap:"10px"
      }}>
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
       <Typography variant="h6" sx={{
        fontWeight:700,
        fontSize:"20px",
        color:"#0f3d63",
        letterSpacing:"1px",
        //flexGrow:1,
       }}>CIVI<span className="track">TRACK</span>
       </Typography>
       </Box>
       <Box
       sx={{
        position:"absolute",
        left:"50%",
        transform:"translateX(-50%)",
        display:"flex",
        alignItems:"center",
        gap:"24px",
       }}
      >
       <Link to="/" style={{textDecoration:"none"}}>
       <Button sx={{color:"#17202a",fontSize:"16px",fontWeight:500,
            textTransform:"none",
            "&:hover":{
                color:"#0a6732",
                backgroundColor:"#87d5ac",
                fontWeight:600,
                 borderRadius:"8px"
            }
            }}>Home</Button>
       </Link>
        <Link to="how-it-works" style={{textDecoration:"none"}}>
         <Button sx={{color:"#17202a",fontSize:"16px",fontWeight:500,
            textTransform:"none",
            "&:hover":{
               color:"#0a6732",
                backgroundColor:"#87d5ac",
                fontWeight:600,
                 borderRadius:"8px"
            }}}>How It Works</Button>
        </Link>
       <Link to="issues" style={{textDecoration:"none"}}>
       <Button sx={{color:"#17202a",fontSize:"16px",fontWeight:500,
            textTransform:"none",
            "&:hover":{
                color:"#0a6732",
                backgroundColor:"#87d5ac",
                fontWeight:600,
                 borderRadius:"8px"
            }}}>Issues</Button>
       </Link>
        
         <Link to="about" style={{textDecoration:"none"}}>
             <Button sx={{color:"#17202a",fontSize:"16px",fontWeight:500,textTransform:"none",
            "&:hover":{
                color:"#0a6732",
                backgroundColor:"#87d5ac",
                fontWeight:600,
                borderRadius:"8px"
            }
         }}>About Us</Button>
         </Link>
         
         </Box>
         <Box sx={{
            position:"absolute",right:0,display:"flex",alignItems:"center",gap:"12px"
            }}>  
            <Link to="login" >
           
        <Button variant='outlined' sx={{
            color:"#0f7a3d",
            borderColor:"#0f7a3d",
            fontWeight:600,
            textTransform:"none",
            marginRight:"50px",
            "&:hover":{
                backgroundColor:"#e8f5ee",
                borderColor:"#0f7a3d"
            }
            }}>Login</Button>
             </Link>
             {/* <Link to="report-issue">
        <Button variant="contained"
        sx={{backgroundColor:"#0f9d58",
            color:"white",
            fontWeight:600,
            textTransform:"none",

            padding:"10px 18px",
            borderRadius:"10px",
            textTransform:"none",
            "&:hover":{
                backgroundColor:"#0c7a45",
            }
        }}
        >Report an Issue</Button>
        </Link> */}
       </Box>
       
     </Box>
     </Box>
    
    </>
  )
}

export default Navbar
