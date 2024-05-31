import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";
import {role} from "../utils/auth.utils.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth(role.USER), addToCart);
cartRouter.post("/remove", auth(role.USER), removeFromCart);
cartRouter.get("/", auth(role.USER), getCart);

export default cartRouter;
