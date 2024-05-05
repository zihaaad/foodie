import express from "express";
import {addFood, listFood} from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

// image storage system
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({storage});

// routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);

export default foodRouter;
