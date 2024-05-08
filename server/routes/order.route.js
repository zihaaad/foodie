import express from "express";
import {
  getMyOrders,
  placeOrder,
  verifyOrder,
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", auth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/my-orders", auth, getMyOrders);

export default orderRouter;
