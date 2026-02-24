import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      default: "Hi everyone, I am using PulseChat",
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
