import Activity from "../models/Activity.js";

export const getActivities = async (
  req,
  res
) => {
  try {

    const activities =
      await Activity.find({
        email: req.user.email
      }).sort({
        createdAt: -1
      });

    res.status(200).json(
      activities
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};