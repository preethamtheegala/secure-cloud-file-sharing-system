import File from "../models/File.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Activity from "../models/Activity.js";

export const uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "securecloud"
          },
          (error, result) => {

            if (error) {
              reject(error);
            } else {
              resolve(result);
            }

          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);

      });
    };

    const result = await streamUpload();

    const file = await File.create({
      uploadedBy: req.user.id,
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      fileSize: req.file.size
    });

    await Activity.create({
      userId: req.user.id,
      email: req.user.email,
      action: "Uploaded File",
      fileName: file.fileName
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file
    });

  } catch (error) {

    console.log("UPLOAD ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getMyFiles = async (req, res) => {
  try {

    const files = await File.find({
      uploadedBy: req.user.id
    }).sort({
      createdAt: -1
    });

    res.status(200).json(files);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const deleteFile = async (req, res) => {
  try {

    const file = await File.findById(
      req.params.id
    );

    if (!file) {
      return res.status(404).json({
        message: "File not found"
      });
    }

    await Activity.create({
      userId: req.user.id,
      email: req.user.email,
      action: "Deleted File",
      fileName: file.fileName
    });

    await File.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "File Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const shareFile = async (req, res) => {
  try {

    const file = await File.findById(
      req.params.id
    );

    if (!file) {
      return res.status(404).json({
        message: "File Not Found"
      });
    }

    file.sharedWith.push(
      req.body.email
    );

    await file.save();

    await Activity.create({
      userId: req.user.id,
      email: req.user.email,
      action: `Shared File With ${req.body.email}`,
      fileName: file.fileName
    });

    res.status(200).json({
      message: "File Shared Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getSharedFiles = async (req, res) => {
  try {

    const files = await File.find({
      sharedWith: req.user.email
    }).sort({
      createdAt: -1
    });

    console.log("FILES FOUND:", files.length);

    res.status(200).json(files);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

export const getFilesSharedByMe = async (req, res) => {
  try {

    const files = await File.find({
      uploadedBy: req.user.id,
      sharedWith: {
        $exists: true,
        $ne: []
      }
    }).sort({
      createdAt: -1
    });

    res.status(200).json(files);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};