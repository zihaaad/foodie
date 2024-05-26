import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
  },
  {minimize: false}
);

const adminSchema = new mongoose.Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
});

export const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
