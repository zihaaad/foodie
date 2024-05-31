import express from "express";
import {addFood, listFood, removeFood} from "../controllers/food.controller.js";
import multer from "multer";
import auth from "../middleware/auth.js";
import {role} from "../utils/auth.utils.js";

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
foodRouter.get("/", listFood);
foodRouter.post("/", upload.single("image"), auth(role.ADMIN), addFood);
foodRouter.delete("/:id", auth(role.ADMIN), removeFood);

export default foodRouter;
