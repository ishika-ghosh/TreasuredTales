import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import groupRoutes from "./routes/groups.js";
import searchRoutes from "./routes/search.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/groups", groupRoutes);
app.use("/search", searchRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});
const CONNECTION_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, (req, res) =>
      console.log("Server is running on port " + PORT)
    )
  )
  .catch((error) => console.log(error));
// https://treasured-tales.vercel.app/
