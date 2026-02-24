import { Readable } from "stream";
import User from "../models/user.model.js";
import { ApiStatus } from "../constants/apiStatus.js";
import { validateUpdateProfilePayload } from "../validators/user.validator.js";
import cloudinary from "../lib/cloudinary.js";

const uploadBufferToCloudinary = (buffer, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });

const uploadProfilePicture = async (profilePic, userId) => {
  const uploadOptions = {
    folder: "PulseChat/avatars",
    public_id: `user_${userId}`,
    overwrite: true,
    transformation: [
      { width: 500, height: 500, crop: "fill", gravity: "face" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  };

  if (profilePic.buffer) {
    return uploadBufferToCloudinary(profilePic.buffer, uploadOptions);
  }

  if (profilePic.path) {
    return cloudinary.uploader.upload(profilePic.path, uploadOptions);
  }

  throw new Error("Profile picture is missing file data");
};

export const updateProfile = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      profilePic: req.file,
    };

    const validation = validateUpdateProfilePayload(payload);
    if (!validation.success) {
      return res.status(ApiStatus.BAD_REQUEST).json({
        success: false,
        errors: validation.errors,
      });
    }
    const { profilePic, fullName, bio } = validation.data;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(ApiStatus.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    if (profilePic) {
      const result = await uploadProfilePicture(profilePic, user._id);
      user.profilePic = result.secure_url;
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (bio) {
      user.bio = bio;
    }
    await user.save();
    return res.status(ApiStatus.OK).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};
