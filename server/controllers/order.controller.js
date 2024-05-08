import Stripe from "stripe";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const client_url = `http://localhost:5173`;

const placeOrder = async (req, res) => {
  const {userId} = req.body;
  const {items, amount, address} = req.body.orderData;

  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {cartData: {}});

    const line_items = items.map((item) => ({
      price_data: {
        currency: "bdt",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 110,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "bdt",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 110,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${client_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${client_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to Payment",
    });
  }
};

const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({
        success: true,
        message: "Payment Successfull",
      });
    } else if (success === "false") {
      await orderModel.findByIdAndDelete(orderId);
      res.json({success: false, message: "Unsuccessful Payment"});
    }
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Unsuccessful Payment"});
  }
};

export {placeOrder, verifyOrder};
