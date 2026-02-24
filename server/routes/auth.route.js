import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/check-auth", protectRoute, checkAuth);

export default router;
