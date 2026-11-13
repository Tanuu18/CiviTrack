import React ,{useState} from 'react'
import "./Issues.css"
import { MenuItem, Select, TextField ,Box, Typography,
   FormControl, InputLabel, Button,Pagination} from '@mui/material'
import cityImage from "../assets/civic5.png"
import potImage from "../assets/pothole.png"
import streetImage from "../assets/street.png"
import garbageImage from "../assets/garbage.png"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Map from '../components/Map'
import { useTranslation } from 'react-i18next' 
const Issues = () => {
  const {t}=useTranslation();
  const [showDetails,setShowDetails]=useState(false);
  const [page,setPage]=useState(1);
  return (
    
    <div className="Issues-page">
        <Box className="issues-hero">
            <Box className="issues-hero-content">
                {/* <Typography variant="h1">Civic <span className='track2'>Issues</span></Typography> */}
                <Typography variant="h1">{t("issues2.title")}</Typography>
                <Typography variant="body1">
                    {t("issues2.description")}
                </Typography>  
            </Box> 
            <Box className="issues-hero-image">
                <img src={cityImage} alt="city"/>
            </Box>
        </Box>
      
      <Box className="issues-filters" sx={{display:"flex",gap:2,
        maxWidth:"1400px",margin:"0 auto 30px",alignItems:"center"
      }}> 
      <TextField fullWidth sx={{  
        width:"300px" 
        }} placeholder={t("issues2.search")}/>   
      <Select  sx={{ 
        width:"300px"
      }} defaultValue="all" displayEmpty fullWidth>
        {/* <MenuItem value="all">All Categories</MenuItem>
        <MenuItem value="roads">Roads</MenuItem>
        <MenuItem value="lights">Street Lights</MenuItem>
        <MenuItem value="garbage">Garbage</MenuItem>
        <MenuItem value="water">Water Supply</MenuItem> */}
        <MenuItem value="all">
  {t("issues2.allCategories")}
</MenuItem>

<MenuItem value="roads">
  {t("issues2.roads")}
</MenuItem>

<MenuItem value="lights">
  {t("issues2.streetLights")}
</MenuItem>

<MenuItem value="garbage">
  {t("issues2.garbage")}
</MenuItem>

<MenuItem value="water">
  {t("issues2.waterSupply")}
</MenuItem>
      </Select>
      <Select  sx={{width:"300px"}} defaultValue="all" displayEmpty fullWidth>
        <MenuItem value="all">{t("issues2.allStatus")}</MenuItem>
        <MenuItem value="reported">{t("issues2.reported")}</MenuItem>
        <MenuItem value="progress">{t("issues2.inProgress")}</MenuItem>
        <MenuItem value="resolved">{t("issues2.resolved")}</MenuItem>
      </Select>
      
      <FormControl sx={{minWidth:260,width:"260px",marginLeft:"auto"}}>
        <InputLabel>{t("issues2.sortBy")}</InputLabel>
        <Select label="Sort By">
            <MenuItem value="newest">{t("issues2.newestFirst")}</MenuItem>
            <MenuItem value="oldest">{t("issues2.oldestFirst")}</MenuItem>
        </Select>
      </FormControl>
      </Box>
      {/* cards */}
     
      <Box className="issues-grid">
        <Box className="issues-list">
      {page === 1 && ( 
        <>
 <Box className="issue-card">
     <Box className="issue-image">
    <img src={potImage} alt="pothole on main" />
     </Box> 

  <Box className="issue-content"> 

    <Box className="issue-top">
       <span className="category-badge">Roads</span>

      <Typography
        variant="body2"
        className="issue-status reported"
      >
        Reported
      </Typography>
    </Box>

    <Typography variant="h6">
      Large Pothole on Main Road
    </Typography>

    <Box className="issue-location">
      <LocationOnIcon />
      <Typography variant="body2">
        Main Road, Ward 12
      </Typography>
    </Box>

    <Box className="issue-date">
      <CalendarMonthIcon />
      <Typography variant="body2">
        Reported on 28 Aug 2026
      </Typography>
    </Box>
         
    <Button
    onClick={(e)=>{
      e.preventDefault();
      setShowDetails(true);
    }}
      variant="outlined"
      className="view-details-btn"
    >
      View Details
    </Button>
  </Box>
  </Box>
      
        
         <Box className="issue-card">
  <Box className="issue-image">
    <img src={streetImage} alt="street light on main" />
  </Box>

  <Box className="issue-content">

    <Box className="issue-top">
      <span className="category-badge">Street Light</span>

      <Typography
        variant="body2"
        className="issue-status progress"
      >
        progress
      </Typography>
    </Box>

    <Typography variant="h6">
      Broken Street Light
    </Typography>

    <Box className="issue-location">
      <LocationOnIcon />
      <Typography variant="body2">
        Green Avenue, Ward 8
      </Typography>
    </Box>

    <Box className="issue-date">
      <CalendarMonthIcon />
      <Typography variant="body2">
        Reported on 28 Aug 2026
      </Typography>
    </Box>

    <Button
    onClick={(e)=>{
      e.preventDefault();
      setShowDetails(true);
    }}
      variant="outlined"
      className="view-details-btn"
    >
      View Details
    </Button>

  </Box>
</Box>

        
        <Box className="issue-card">
  <Box className="issue-image">
    <img src={garbageImage} alt="garbage on main" />
  </Box>

  <Box className="issue-content">

    <Box className="issue-top">
      <span className="category-badge">Garbage</span>

      <Typography
        variant="body2"
        className="issue-status resolved"
      >
        resolved
      </Typography>
    </Box>

    <Typography variant="h6">
      Garbage Overflow
    </Typography>

    <Box className="issue-location">
      <LocationOnIcon />
      <Typography variant="body2">
        Green Avenue, Ward 8
      </Typography>
    </Box>

    <Box className="issue-date">
      <CalendarMonthIcon />
      <Typography variant="body2">
        Reported on 28 Aug 2026
      </Typography>
    </Box>      
    <Button           
    onClick={(e)=>{ 
      e.preventDefault();
      setShowDetails(true);
    }}
      variant="outlined"
      className="view-details-btn">
      View Details 
    </Button>
    
  </Box>
  </Box>
  </> 
    )}
  {/* </Box> */}
   
        <Box className="pagination-container">
          <Pagination count={3}
          page={page}
          onChange={(event,value)=>setPage(value)}
          color="primary" />     
              </Box>
              
</Box>
  

       
         <Map/>
      </Box> 
      {showDetails && (
  <div className="issue-details">

    <h2>Complaint Details</h2>

    <p>
      <strong>Complaint ID:</strong> CT-2026-00452
    </p>

    <p>
      <strong>Title:</strong> Large Pothole on Main Road
    </p>

    <p>
      <strong>Category:</strong> Roads
    </p>

    <p>
      <strong>Location:</strong> Main Road, Ward 12
    </p>

    <p>
      <strong>Status:</strong> In Progress
    </p>

    <p>
      <strong>Reported on:</strong> 28 Aug 2026
    </p>

    <p>
      <strong>Description:</strong> A large pothole has developed on the main road,
      causing difficulty for vehicles and pedestrians.
    </p>

    <button onClick={() => setShowDetails(false)}> 
      Close    
    </button>

  </div>
)} 
    
    </div>
    
  )
}

export default Issues
