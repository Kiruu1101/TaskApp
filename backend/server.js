import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import taskRouter from "./routers/taskroutes.js";
import userRouter from "./routers/userroutes.js";
import emailRoutes from "./routers/emails.js";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8000;



app.use('/api', emailRoutes);

app.use(cookieParser());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Your server is alive",
  });
});
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use('/api/emails', emailRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static("/var/data/uploads"));
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);
app.get("*", (req, res) =>
  res.status(404).json({ message: "Route not found" })
);
app.use(errorHandlerMiddleware);
const MONGO_URL="mongodb+srv://kiran:Ranik1101@cluster0.zw5lwa0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ||process.env.MONGO_URL;
try {
  await mongoose.connect(MONGO_URL);
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
