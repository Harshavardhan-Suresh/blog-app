import express from "express";
import mongoose, { connect } from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
// const dotenv = require("dotenv")
import dotenv from "dotenv"
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json()) 
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
dotenv.config();
// require("dotenv").config();
mongoose.connect(
    "mongodb+srv://admin:8jhKcHMfCE4EZki@cluster0.ahwpuqx.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => app.listen(process.env.PORT || 5000))
.then(() => console.log("Connected to Database and Listening to localhost 5000"))
.catch((err) => console.log(err));
// app.use("/", (req, res, next) => {
//     res.send("Hello world");
// });
