import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.post("/remove", auth, removeFromCart);
cartRouter.get("/", auth, getCart);

export default cartRouter;
