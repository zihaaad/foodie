import foodModel from "../models/food.model.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  const {name, description, price, category} = req.body;
  let image = `${req.file.filename}`;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image,
  });

  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added Successfully",
    });
  } catch (error) {
    // console.log(error);
    fs.unlink(`uploads/${image}`, () => {});
    res.json({
      success: false,
      message: "Failed to Add Food",
    });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      message: "Food List Retrieved Successfully",
      data: foods,
    });
  } catch (error) {
    // console.log(error);
    res.json({
      success: false,
      message: "Failed to Retrieve Food",
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const {id} = req.params;
    const food = await foodModel.findById(id);

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Food is Removed Successfully",
    });
  } catch (error) {
    // console.log(error);
    res.json({success: false, message: "Failed To Remove Food"});
  }
};

export {addFood, listFood, removeFood};
