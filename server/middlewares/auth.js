import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiStatus } from "../constants/apiStatus.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(ApiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(ApiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const user = await User.findById(decoded.userId).select("+refreshToken");
    if (!user) {
      return res.status(ApiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    // if (user.refreshToken !== token) {
    //   return res.status(ApiStatus.UNAUTHORIZED).json({
    //     success: false,
    //     message: "Unauthorized.",
    //   });
    // }
    req.user = user;
    next();
  } catch (error) {
    console.error("protectRoute error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
