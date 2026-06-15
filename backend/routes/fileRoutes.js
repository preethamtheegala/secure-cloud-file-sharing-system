import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  uploadFile,
  getMyFiles,
  deleteFile,
  shareFile,
  getFilesSharedByMe,
  getSharedFiles
} from "../controllers/fileController.js";

const router = express.Router();


router.get(
  "/myfiles",
  protect,
  getMyFiles
);

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadFile
);

router.delete(
  "/:id",
  protect,
  deleteFile
);

router.put(
  "/share/:id",
  protect,
  shareFile
);

router.get(
  "/shared",
  protect,
  getSharedFiles
);

router.get(
  "/shared-by-me",
  protect,
  getFilesSharedByMe
);


export default router;