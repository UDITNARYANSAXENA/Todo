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
    origin: (origin, callback) => {
      callback(null, origin || '*'); // Allow all origins
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
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
