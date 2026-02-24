import express from "express";
import { getMessages, getUsers } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.js";
const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/:receiverId", protectRoute, getMessages);
export default router;
