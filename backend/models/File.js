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
        email: {
          type: String
        },

        permission: {
          type: String,
          enum: [
            "view",
            "download"
          ],
          default: "view"
        },

        expiresAt: {
          type: Date
        }
      }
    ],

    secureToken: {
      type: String,
      default: null
    },

    secureTokenExpiry: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "File",
  fileSchema
);