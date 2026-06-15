import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    fileSize: {
      type: Number
    },

    sharedWith: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "File",
  fileSchema
);