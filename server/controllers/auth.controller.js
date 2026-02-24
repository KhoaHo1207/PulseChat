import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiStatus } from "../constants/apiStatus.js";
import { validateSignUpPayload } from "../validators/auth.validator.js";

export const signUp = async (req, res) => {
  const validation = validateSignUpPayload(req.body);

  if (!validation.success) {
    return res.status(ApiStatus.BAD_REQUEST).json({
      success: false,
      errors: validation.errors,
    });
  }

  const { fullName, email, password, bio } = validation.data;

  try {
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.status(ApiStatus.CONFLICT).json({
        success: false,
        message: "Email is already registered.",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    return res.status(ApiStatus.CREATED).json({
      success: true,
      message: "Account created successfully.",
      results: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("signUp error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Unable to create account.",
    });
  }
};
