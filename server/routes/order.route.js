import express from "express";
import {placeOrder} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", auth, placeOrder);

export default orderRouter;
