import File from "../models/File.js";
import Activity from "../models/Activity.js";

export const getDashboardStats =
  async (req, res) => {
    try {

      const myFiles =
        await File.find({
          uploadedBy:
            req.user.id
        });

      const sharedWithMe =
        await File.find({
          sharedWith:
            req.user.email
        });

      const activities =
        await Activity.find({
          email:
            req.user.email
        })
          .sort({
            createdAt: -1
          })
          .limit(5);

      const totalFiles =
        myFiles.length;

      const sharedByMe =
        myFiles.filter(
          file =>
            file.sharedWith &&
            file.sharedWith.length > 0
        ).length;

      const storageUsed =
        myFiles.reduce(
          (
            total,
            file
          ) =>
            total +
            file.fileSize,
          0
        );

      res.status(200).json({
        totalFiles,
        sharedByMe,
        sharedWithMe:
          sharedWithMe.length,
        activityCount:
          activities.length,
        storageUsed,
        recentActivities:
          activities
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }
  };