import {adminModel} from "../models/user.model.js";
import bcrypt from "bcrypt";

const seedAdmin = async () => {
  const admin = await adminModel.findOne();
  if (!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const adminData = {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPass,
    };
    await adminModel.create(adminData);
  }
};

export default seedAdmin;
