import mongoose, {Schema} from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  items: {type: Array, required: true},
  amount: {type: Number, required: true},
  address: {type: Object, require: true},
  status: {type: String, default: "Processing"},
  date: {type: Date, default: Date.now()},
  payment: {type: Boolean, default: false},
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
