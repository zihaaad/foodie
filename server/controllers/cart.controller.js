import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
  const {userId, itemId} = req.body;
  try {
    const user = await userModel.findById({_id: userId});
    const cartData = user.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true, message: "Added To Cart"});
  } catch (error) {
    // console.log(error);
    res.json({success: false, message: "Failed Add To Cart"});
  }
};

const removeFromCart = async (req, res) => {
  const {userId, itemId} = req.body;
  try {
    const user = await userModel.findById(userId);
    let cartData = await user.cartData;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true, message: "Removed from Cart"});
  } catch (error) {
    // console.log(error);
    res.json({success: false, message: "Failed Remove from Cart"});
  }
};

const getCart = async (req, res) => {
  const {userId} = req.body;
  try {
    const user = await userModel.findById(userId);
    let cartData = await user.cartData;

    res.json({
      success: true,
      message: "Cart Data Retrieved Successfully",
      data: cartData,
    });
  } catch (error) {
    // console.log(error);
    res.json({success: false, message: "Failed To Retrieved Cart Data"});
  }
};

export {addToCart, removeFromCart, getCart};
