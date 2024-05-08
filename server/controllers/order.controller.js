import stripe from "stripe";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

const client_url = `http://localhost:5173/`;

const placeOrder = async (req, res) => {
  const {userId, items, amount, address} = req.body;
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
    });

    const session = await stripe.Checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${client_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${client_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      message: "Payment Successful!",
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

export {placeOrder};
