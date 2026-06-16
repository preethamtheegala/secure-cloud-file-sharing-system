import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

import {
  uploadFile,
  getMyFiles,
  deleteFile,
  shareFile,
  getFilesSharedByMe,
  getSharedFiles,
  generateSecureLink,
  removeSharedUser,
  updateSharedUser,
  accessSecureLink
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
  (req, res, next) => {

    upload.single("file")(
      req,
      res,
      (err) => {

        if (err) {

          if (
            err.code ===
            "LIMIT_FILE_SIZE"
          ) {

            return res.status(400).json({
              message:
                "File exceeds 20MB"
            });

          }

          return res.status(400).json({
            message:
              err.message
          });

        }

        next();

      }
    );

  },
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

router.get(
  "/secure-link/:id",
  protect,
  generateSecureLink
);

router.get(
  "/access/:token",
  accessSecureLink
);

router.put(
  "/update-share/:id",
  protect,
  updateSharedUser
);

router.put(
  "/remove-share/:id",
  protect,
  removeSharedUser
);

export default router;