import jwt from "jsonwebtoken";
import userModel, {adminModel} from "../models/user.model.js";

const auth = (role) => {
  return async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    try {
      const {id} = jwt.verify(token, process.env.JWT_SECRET);
      if (id) {
        const user = await userModel.findById(id).select("-password");
        const admin = await adminModel.findById(id).select("-password");

        if (!user && !admin) {
          return res.json({success: false, message: "User Does not Exists!"});
        }

        if ((!role === "user" && user) || (!role === "admin" && admin)) {
          return res.json({
            success: false,
            message: "Your are not Authorized!",
          });
        }
      }

      req.body.userId = id;
      next();
    } catch (error) {
      // console.log(error);
      res.json({success: false, message: "Something went wrong!"});
    }
  };
};

export default auth;
