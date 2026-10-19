
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    action: {
      type: String,
      required: true
    },

    oldStatus: {
      type: String,
      default: null
    },

    newStatus: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity; 
