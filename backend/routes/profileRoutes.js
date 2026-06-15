import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePhoto
} from "../controllers/profileController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getProfile
);

router.put(
  "/update",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.put(
  "/upload-photo",
  protect,
  upload.single("image"),
  uploadProfilePhoto
);

export default router;