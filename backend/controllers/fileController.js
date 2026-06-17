import File from "../models/File.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Activity from "../models/Activity.js";
import crypto from "crypto";
import fs from "fs";
import getClamAV from "../utils/scanFile.js";

import {
  encryptBuffer
} from "../utils/encryption.js";


export const uploadFile = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

   if (!fs.existsSync("temp")) {
  fs.mkdirSync("temp");
}

const tempFile =
  `temp/${Date.now()}-${req.file.originalname}`;

fs.writeFileSync(
  tempFile,
  req.file.buffer
);

if (process.env.NODE_ENV !== "production") {

  const clamscan =
    await getClamAV();

  const scanResult =
    await clamscan.scanFile(
      tempFile
    );

  if (
    scanResult.isInfected
  ) {

    fs.unlinkSync(
      tempFile
    );

    return res.status(400).json({
      message:
        "Malware detected. Upload blocked."
    });

  }

}

fs.unlinkSync(
  tempFile
);

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const resourceType =
        req.file.mimetype ===
        "application/pdf"
        ? "raw"
        : "auto";
         const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: resourceType,
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
  .createReadStream(
    req.file.buffer
  )
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

    if (
      file.uploadedBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own files"
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

    if (
      file.uploadedBy.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can only share your own files"
      });
    }

    const email =
      req.body.email
        .trim()
        .toLowerCase();

    const permission =
      req.body.permission ||
      "view";

    const days =
      Number(req.body.days) || 1;

    const expiresAt =
      new Date(
        Date.now() +
        days *
        24 *
        60 *
        60 *
        1000
      );

    const alreadyShared =
      file.sharedWith.some(
        (user) =>
          user.email === email
      );

    if (alreadyShared) {
      return res.status(400).json({
        message:
          "File already shared with this user"
      });
    }

    file.sharedWith.push({
      email,
      permission,
      expiresAt
    });

    await file.save();

    await Activity.create({
      userId: req.user.id,
      email: req.user.email,
      action: `Shared File With ${email}`,
      fileName: file.fileName
    });

    res.status(200).json({
      message:
        "File Shared Successfully"
    });

  } catch (error) {

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

export const getSharedFiles = async (req, res) => {
  try {

    const files =
      await File.find({
        "sharedWith.email":
          req.user.email
      }).sort({
        createdAt: -1
      });

    const validFiles =
      files.filter(
        (file) => {

          const share =
            file.sharedWith.find(
              (user) =>
                user.email ===
                req.user.email
            );

          return (
            share &&
            share.expiresAt >
              new Date()
          );

        }
      );

    res.status(200).json(
      validFiles
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

export const generateSecureLink =
  async (req, res) => {

    try {

      const file =
        await File.findById(
          req.params.id
        );

      if (!file) {

        return res.status(404).json({
          message:
            "File Not Found"
        });

      }

      if (
        file.uploadedBy.toString() !==
        req.user.id
      ) {

        return res.status(403).json({
          message:
            "Unauthorized"
        });

      }

      const token =
        crypto.randomBytes(
          32
        ).toString("hex");

      file.secureToken =
        token;

      file.secureTokenExpiry =
        new Date(
          Date.now() +
          60 *
          60 *
          1000
        );

      await file.save();

      res.status(200).json({
        token
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

export const accessSecureLink =
  async (req, res) => {

    try {

      const file =
        await File.findOne({
          secureToken:
            req.params.token
        });

      if (!file) {

        return res.status(404).json({
          message:
            "Invalid Link"
        });

      }

      if (
        file.secureTokenExpiry <
        new Date()
      ) {

        return res.status(400).json({
          message:
            "Link Expired"
        });

      }

      return res.redirect(
        file.fileUrl
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

  export const removeSharedUser =
async (req, res) => {

  try {

    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        message:
          "File Not Found"
      });

    }

    file.sharedWith =
      file.sharedWith.filter(
        (user) =>
          user.email !==
          req.body.email
      );

    await file.save();

    res.status(200).json({
      message:
        "Access Removed"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

export const updateSharedUser =
async (req, res) => {

  try {

    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        message:
          "File Not Found"
      });

    }

    const index =
      file.sharedWith.findIndex(
        (u) =>
          u.email ===
          req.body.email
      );

    if (index === -1) {

      return res.status(404).json({
        message:
          "User Not Found"
      });

    }

    file.sharedWith[index].permission =
      req.body.permission;

    file.sharedWith[index].expiresAt =
      new Date(
        Date.now() +
        Number(req.body.days) *
        24 *
        60 *
        60 *
        1000
      );

    file.markModified(
      "sharedWith"
    );

    await file.save();

    res.status(200).json({
      message:
        "Access Updated",
      sharedUser:
        file.sharedWith[index]
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};