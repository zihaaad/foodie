import express from "express";
import cors from "express";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

// app-config
dotenv.config();
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({success: true, server: "active"});
});

// database connection
connectDB();

app.listen(port, () => {
  console.log(`SERVER RUNNING ON http://localhost:${port}`);
});
