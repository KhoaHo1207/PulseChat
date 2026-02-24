import express from "express";
import { protectRoute } from "../middlewares/auth.js";
import { updateProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.put(
  "/update-profile",
  upload.single("profilePic"),
  protectRoute,
  updateProfile
);

export default router;
