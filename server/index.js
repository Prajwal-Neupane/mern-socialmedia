import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import postRoute from "./Routes/postRoute.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("The error is ", err));
};
connectDB();

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

app.listen(process.env.PORT, () => console.log("Server is running"));
