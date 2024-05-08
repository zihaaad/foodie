import express from "express";
import {
  getMyOrders,
  orderList,
  placeOrder,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", auth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/my-orders", auth, getMyOrders);
orderRouter.get("/order-list", auth, orderList);
orderRouter.patch("/order-status/:orderId", auth, updateOrderStatus);

export default orderRouter;
