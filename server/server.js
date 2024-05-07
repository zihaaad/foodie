import express from "express";
import cors from "cors";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";

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

// api end-points (routes)
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/images", express.static("uploads"));

app.listen(port, () => {
  console.log(`SERVER RUNNING ON http://localhost:${port}`);
});
