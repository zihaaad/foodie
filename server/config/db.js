import mongoose from "mongoose";
import seedAdmin from "../utils/seedAdmin.js";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY!!"));
    seedAdmin();
  } catch (error) {
    console.log(error);
  }
};
