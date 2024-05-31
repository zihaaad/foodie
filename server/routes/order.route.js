import express from "express";
import {
  getMyOrders,
  orderList,
  placeOrder,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";
import {role} from "../utils/auth.utils.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", auth(role.USER), placeOrder);
orderRouter.post("/verify", auth(role.USER), verifyOrder);
orderRouter.get("/my-orders", auth(role.USER), getMyOrders);
orderRouter.get("/order-list", auth(role.ADMIN), orderList);
orderRouter.patch(
  "/order-status/:orderId",
  auth(role.ADMIN),
  updateOrderStatus
);

export default orderRouter;
