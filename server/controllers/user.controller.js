import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import {generateToken} from "../utils/generateToken.js";

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if (!user) {
      return res.json({
        success: false,
        message: "User Doesn't Exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      message: "User Logged In Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Failed To Login",
    });
  }
};

const registerUser = async (req, res) => {
  const {name, password, email} = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const isExists = await userModel.findOne({email});

  if (isExists) {
    return res.json({
      success: false,
      message: "User Already Exists",
    });
  }

  if (!validator.isEmail(email)) {
    return res.json({
      success: false,
      message: "Please enter a Valid Email",
    });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password Must be at least 8 characters",
    });
  }

  try {
    const user = await userModel.create({
      name,
      email,
      password: hashedPass,
    });
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "User Registration Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "User Registration Failed",
    });
  }
};

export {loginUser, registerUser};
