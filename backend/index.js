import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from "../backend/routes/todo.routes.js";
import userRoute from "../backend/routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const MONGODB_URI = process.env.MONGODB_URI;

//midleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//connect to mongodb

try {
  await mongoose.connect(MONGODB_URI);
  console.log("connected to MongoDb");
} catch (error) {
  console.log(error);
}

// //routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
