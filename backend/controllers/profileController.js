import User from "../models/User.js";
import File from "../models/File.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const getProfile = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    const files =
      await File.find({
        uploadedBy: req.user.id
      });

    const totalFiles =
      files.length;

    const sharedFiles =
      files.filter(
        file =>
          file.sharedWith &&
          file.sharedWith.length > 0
      ).length;

    const storageUsed =
      files.reduce(
        (total, file) =>
          total + file.fileSize,
        0
      );

    res.status(200).json({
      ...user.toObject(),
      totalFiles,
      sharedFiles,
      storageUsed
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const updateProfile =
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found"
          });
      }

      user.name =
        req.body.name ||
        user.name;

      await user.save();

      res.status(200).json({
        message:
          "Profile updated successfully"
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };

export const changePassword =
  async (req, res) => {
    try {

      const {
        currentPassword,
        newPassword
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const match =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!match) {
        return res
          .status(400)
          .json({
            message:
              "Current password is incorrect"
          });
      }

      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      await user.save();

      res.status(200).json({
        message:
          "Password changed successfully"
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };

export const uploadProfilePhoto =
  async (req, res) => {
    try {

      if (!req.file) {
        return res
          .status(400)
          .json({
            message:
              "No image selected"
          });
      }

      const streamUpload =
        () => {
          return new Promise(
            (
              resolve,
              reject
            ) => {

              const stream =
                cloudinary.uploader.upload_stream(
                  {
                    folder:
                      "securecloud/profile"
                  },
                  (
                    error,
                    result
                  ) => {

                    if (
                      result
                    ) {
                      resolve(
                        result
                      );
                    } else {
                      reject(
                        error
                      );
                    }

                  }
                );

              streamifier
                .createReadStream(
                  req.file.buffer
                )
                .pipe(stream);

            }
          );
        };

      const result =
        await streamUpload();

      const user =
        await User.findById(
          req.user.id
        );

      user.profileImage =
        result.secure_url;

      await user.save();

      res.status(200).json({
        profileImage:
          result.secure_url
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };