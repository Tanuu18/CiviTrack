import Complaint from "../models/Complaint.js";
import mongoose from "mongoose";
import Counter from "../models/Counter.js";
import User from "../models/Users.js";
import Activity from "../models/Activity.js";
import cloudinary from "../config/cloudinary.js";
export const createComplaint = async (req, res) => {
  try { 
    const {
      title,
      description,
      category,
      location,
      latitude,        
      longitude
    } = req.body;
    let imageUrl = "";

if (req.file) {
  const uploadedImage = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "CiviTrack/complaints" },
      (error, result) => {
        if (error) {
          console.log("cloudinary error",error);
          
          reject(error);
        } else {
          resolve(result); 
        }
      }
    );

    stream.end(req.file.buffer);
  });

  imageUrl = uploadedImage.secure_url;
}
     const officer=await User.findOne({role:"officer",department:category});
    // Complaint number will automatically increase 
    const counter = await Counter.findOneAndUpdate(
      { name: "complaint" },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true
      }
    );

    // India  current date
    const datePart = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
      .format(new Date())
      .replace(/-/g, "");

    // 1 → 0001, 2 → 0002...
    const sequencePart = counter.sequence
      .toString()
      .padStart(4, "0");

    const complaintId =
      `CT-${datePart}-${sequencePart}`;

    const complaint = await Complaint.create({
      complaintId,
      citizen: req.user.id,
      title,
      description,
      category,            
      location,
      latitude:latitude ?? null,
      longitude:longitude ?? null,
      imageUrl,
      assignedOfficer:officer?officer._id:null,
      status:officer?"Assigned":"Pending"
    });
    await Activity.create({
      complaint:complaint._id,
      actor:req.user.id,
      action:"COMPLAINT_CREATED",
      newStatus:complaint.status
    });
    if(officer){
      await Activity.create({
        complaint:complaint._id,
        actor:null,
        action:"complaint_assigned",
        oldStatus:"Pending",
        newStatus:"Assigned"
      });
    }
    return res.status(201).json({
      message: "Complaint submitted successfully",

      complaint: {
        complaintId: complaint.complaintId,
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        location: complaint.location,
        status: complaint.status
      }
    });

  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const getOfficerComplaints=async(req,res)=>{
  try {
    const complaints = await Complaint.find({
      assignedOfficer:req.user.id
    }).sort({createdAt:-1});
    return res.status(200).json({
      message:"officer  complaints fethced",complaints
    });
  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
}
export const getComplaintById=async(req,res)=>{
  try {
    const {complaintId}=req.params;
    const complaint=await Complaint.findOne({complaintId});
    if(!complaint){
      return res.status(404).json({message:"Complaint not found"});
    }
    return res.status(201).json({message:"Complaint fetched successfully", complaint: {
    complaintId: complaint.complaintId,
    title: complaint.title,
    category: complaint.category,
    location: complaint.location,
    status: complaint.status,
    createdAt:complaint.createdAt,
    updatedAt:complaint.updatedAt
  }});
  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
}

export const updateComplaintStatus=async(req,res)=>{
  try {
    const {complaintId}=req.params;
    const {status}=req.body;
    const complaint=await Complaint.findOne({
      complaintId,
      assignedOfficer:req.user.id
    });
    if(!complaint){
      return res.status(404).json({
        message:"Complaint not found"
      });
    }
    const oldStatus=complaint.status;
    complaint.status=status;
    await complaint.save();
    await Activity.create({
      complaint:complaint._id,
      actor:req.user.id,
      action:"status_updated",oldStatus,
      newStatus:status
    }); 
    return res.status(200).json({
        message:"Complaint status updated successfully",complaint
      });
  } catch (error) {
    console.error("CREATE COMPLAINT ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
}

export const getOfficerActivities = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedOfficer: req.user.id
    }).select("_id");

    const complaintIds = complaints.map(
      (complaint) => complaint._id
    );

    const activities = await Activity.find({
      complaint: { $in: complaintIds }
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("complaint", "complaintId title status");

    return res.status(200).json({
      message: "Activities fetched successfully",
      activities
    });
  } catch (error) {
    console.error("GET OFFICER ACTIVITIES ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();

    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending"
    });

    const assignedComplaints = await Complaint.countDocuments({
      status: "Assigned"
    });

    const inProgressComplaints = await Complaint.countDocuments({
      status: "In Progress"
    });

    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved"
    });

    const totalOfficers = await User.countDocuments({
      role: "officer"
    });
    const categoryCounts = await Complaint.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 }
    }
  }
]);

    return res.status(200).json({
      totalComplaints,
      pendingComplaints,
      assignedComplaints,            
      inProgressComplaints,      
      resolvedComplaints,  
      totalOfficers,
      categoryCounts 
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

export const getAllAdminComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      // .limit(10)
      .populate("citizen", "name")
      .populate("assignedOfficer", "name");

    return res.status(200).json({
      message: "Complaints fetched successfully",
      complaints
    });
  } catch (error) {
    console.error("GET ADMIN COMPLAINTS ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};