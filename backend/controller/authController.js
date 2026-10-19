import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User with this email already exits"});
        }
        const hashedPassword=await bcrypt.hash(password,10); 
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        }) 
    } catch (error) {
        res.status(500).json({message:"Serever error"});
    }
}
 
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
           return res.status(400).json({message:"Invalid email or password"});
        }
      const isPasswordCorrect=await  bcrypt.compare(password,user.password);
       if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid email or password"});
       }

      const token = jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        return res.status(201).json({
            message:"Login successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        }) 
    } catch (error) { 
         res.status(500).json({message:"Serever error"});
    }  
}
export const createAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({
      role: "admin"
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const admin = await User.create({
      name: "CivicTrack Admin",
      email: "admin@civictrack.com",
      password: hashedPassword,
      role: "admin"
    });

    return res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const createOfficer=async(req,res)=>{
    try {
      console.log("create officer request",req.body);
      
        const {name,email,password,phone,department,designation,officerId,area}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User with this email already exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const officer=await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            department,
            designation,
            officerId,
            area,
            role:"officer"
        });
        return res.status(201).json({
            message: "Officer created successfully",
      officer: {
        id: officer._id,
        name: officer.name, 
        email: officer.email,
        phone: officer.phone, 
        department: officer.department,
        designation: officer.designation,
        officerId: officer.officerId,
        area: officer.area,
        role: officer.role
      }
        });
    } catch (error) {
      console.log(error);
      
        return res.status(500).json({
      message: "Server error"
    });
    }
}

export const getOfficers=async(req,res)=>{
  try {
    const officers=await User.find({role:"officer"}).select("-password");//password exclude dont show on frontend
    return res.status(200).json({message:"Officers fetched successfully",officers});

  } catch (error) {
    console.log(error);
      
        return res.status(500).json({
      message: "Server error"
    });
  }
}


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};
