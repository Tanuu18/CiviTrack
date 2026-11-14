import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    image:{
        type:String,
        default:""
    },
    complaintId: {   
      type: String,
      unique: true,
      required: true
    },

    citizen: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },
       
aiAnalysis: {
  category: {
    type: String,
    default: "",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: null,
  },
  summary: {
    type: String,
    default: "",
  },
},

    location: {
      type: String, 
      required: true
    },
     latitude:{
      type:Number,
      default:null
     },
     longitude:{
      type:Number,
      default:null
     },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "In Progress", "Resolved"],
      default: "Pending"
    },

    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    supportedBy:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    ],
    isDeleted: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;