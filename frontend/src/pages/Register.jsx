import React from 'react'
import "./Register.css"
import loginImage from "../assets/login.png"
import { User,Mail,LockKeyhole } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../utils/axios'
const Register = () => {
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
      const formData=new FormData(e.target);
      const name=formData.get("name");
      const email=formData.get("email");
      const password=formData.get("password");
      const confirmPassword=formData.get("confirmPassword");
      if(password!==confirmPassword){
        alert("passwords do not match");
        return;
      }
      try{
       const response=await api.post("/auth/register",{
        name,
        email,
        password 
       });
       console.log(response.data);  
       navigate("/login");    
      }catch(error){
        console.log(error.response?.data);
        
      }    
  };
  return (
    <div className='register-page'>
        <div className='register-container'>
            {/* left side */}
            <div className='register-left'>
              <img src={loginImage} alt="login image" className="register-image"/>
              <div className="register-overlay">
                <div className="brand-content">
                    <h1>CiviTrack</h1>
                  <p className="register-tagline">
                    Report. Track. Resolve.
                  </p>
                </div>
                  <div className="overlay-line"></div>   
                  <h2>                
                    A Cleaner,
                    <br/>
                    Safer & Better
                    <br/>
                    Tomorrow
                  </h2>
                  <p className='overlay-description'>Small actions create<br/> big changes.
                  <br/>
                  Be the voice for<br/> a better community
                  </p>
                  <div className='carousel-dots'>
                    <span className='active'></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
              </div>
            </div>       
             <div className="register-right">
                 <h2>Create Account</h2>
                  <p className='register-subtitle'>Create Your CiviTrack account</p>
                  <form onSubmit={handleSubmit}>   
                    <div className='input-wrapper'>
                        <User className="input-icon" size={18}/>
                        <label>Full Name</label>
                        <input type="text" name="name" placeholder="Enter your full name"/>
                    </div>
                     <div className='input-wrapper'>
                        <Mail className="input-icon" size={18}/>
                       <label>Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email"/> 
                    </div>   
                      <div className='input-wrapper'> 
                        <LockKeyhole className="input-icon" size={18}/> 
                       <label>Password</label> 
                    <input type="password" name="password" placeholder="Enter your password"/>
                    </div>
                      <div className='input-wrapper'>
                        <LockKeyhole className="input-icon" size={18}/>
                      <label>Confirm Password</label>
                    <input type="text" name="confirmPassword" placeholder="Confirm your password"/>
                    </div>
                    <button type="submit">Create Account</button>
                  </form>
                  <p className="login-link">Already have an account?{" "}
                    <Link to="/login">Login</Link></p>
             </div>
        </div>
    </div>
  )
}

export default Register
