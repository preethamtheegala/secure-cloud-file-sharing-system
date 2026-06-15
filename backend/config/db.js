import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB Connected");
    console.log(conn.connection.host);
  } catch (error) {
    console.log("MongoDB Error:");
    console.log(error.message);
  }
};

export default connectDB;