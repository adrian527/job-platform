import * as dotenv from "dotenv";
dotenv.config();

// catch async errors to error route
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Setup public folder
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// routers
import jobRouter from "./routers/jobRouter.js";
import userRouter from "./routers/userRouter.js";
import manageRouter from "./routers/manageRouter.js";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/userMiddleware.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// setup router
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/manage", authenticateUser, manageRouter);
app.use("/api/v1/user", userRouter);
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// NOT FOUND MIDDLEWARE
// * - ALL ROUTES
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

// IF WE CANT CONNECT TO DATABASE PLEASE CLOSE APP
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    } else {
      console.log("Server is running...");
    }
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
