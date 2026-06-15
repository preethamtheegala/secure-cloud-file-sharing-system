import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Secure Cloud Backend Running");
});

app.use("/api/auth", authRoutes);

app.listen(8000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:8000");
});