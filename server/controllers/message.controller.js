import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { ApiStatus } from "../constants/apiStatus.js";
import { v2 as cloudinary } from "cloudinary";
export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: currentUserId },
    }).select("-password -refreshToken");

    // 🔥 1 query duy nhất
    const unseenCounts = await Message.aggregate([
      {
        $match: {
          receiverId: currentUserId,
          seen: false,
        },
      },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 },
        },
      },
    ]);

    const unseenMessages = {};
    unseenCounts.forEach((item) => {
      unseenMessages[item._id.toString()] = item.count;
    });

    return res.status(ApiStatus.OK).json({
      success: true,
      message: "Users fetched successfully.",
      results: {
        users,
        unseenMessages,
      },
    });
  } catch (error) {
    console.error("getUsers error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId },
        { senderId: receiverId, receiverId: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic")
      .lean();

    Message.updateMany(
      {
        senderId: receiverId,
        receiverId: req.user._id,
        seen: false,
      },
      { seen: true }
    ).catch(console.error);

    return res.status(ApiStatus.OK).json({
      success: true,
      message: "Messages fetched successfully.",
      results: messages,
    });
  } catch (error) {
    console.log("getMessages error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const uploadImage = async (image, messageId) => {
  const uploadOptions = {
    folder: "PulseChat/messages",
    public_id: `message_${messageId}`,
  };
  return cloudinary.uploader.upload(image, uploadOptions);
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, image } = req.body;
    const senderId = req.user._id;

    if (image) {
      const result = await uploadImage(image, message._id);
      message.image = result.secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image: image ? result.secure_url : "",
    });

    return res.status(ApiStatus.CREATED).json({
      success: true,
      message: "Message sent successfully.",
      results: message,
    });
  } catch (error) {
    console.log("sendMessage error:", error);
    return res.status(ApiStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
