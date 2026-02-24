import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiStatus } from "../constants/apiStatus.js";
import {
  validateSignInPayload,
  validateSignUpPayload,
} from "../validators/auth.validator.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middlewares/jwt.js";

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
      message: "Internal server error.",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const validation = validateSignInPayload(req.body);

    if (!validation.success) {
      return res.status(ApiStatus.BAD_REQUEST).json({
        success: false,
        errors: validation.errors,
      });
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email }).select("+password").lean();

    if (!user) {
      return res.status(ApiStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(ApiStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          refreshToken,
        },
      },
      { new: true }
    );
    return res.status(ApiStatus.OK).json({
      success: true,
      message: "Sign in successful.",
      results: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("signIn error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
