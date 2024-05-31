import express from "express";
import {
  adminUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import {role} from "../utils/auth.utils.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/admin", auth(role.ADMIN), adminUser);

export default userRouter;
