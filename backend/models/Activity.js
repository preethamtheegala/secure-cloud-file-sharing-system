import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    email: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Activity",
  activitySchema
);