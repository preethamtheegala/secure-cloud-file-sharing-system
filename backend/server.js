import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import fileRoutes from "./routes/fileRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.use(
  "/api/files",
  fileRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.get("/", (req, res) => {
  res.send("Secure Cloud Backend Running");
});

app.use("/api/auth", authRoutes);

app.listen(8000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:8000");
});

app.use(
  "/api/dashboard",
  dashboardRoutes
);

