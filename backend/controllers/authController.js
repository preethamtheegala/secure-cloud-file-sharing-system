import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Activity from "../models/Activity.js";

export const registerUser = async (req, res) => {
  try {

    console.log("REGISTER HIT");

    const { name, email, password } = req.body;

    console.log("STEP 1");

    const userExists = await User.findOne({
      email
    });

    console.log("STEP 2");

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    console.log("STEP 3");

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    console.log("STEP 4");

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("STEP 5");

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log("REGISTER ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const loginUser = async (req, res) => {
  try {

    console.log("LOGIN HIT");

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    await Activity.create({
      userId: user._id,
      email: user.email,
      action: "Logged In"
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};