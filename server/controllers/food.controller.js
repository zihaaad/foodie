import foodModel from "../models/food.model.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  const {name, description, price, category} = req.body;
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed to Add Food",
    });
  }
};

export {addFood};
