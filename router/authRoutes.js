import express from "express";
import { login, signup, update } from "../controllers/authController.js";

import {
  loginValidation,
  signupValidation,
  updateValidation,
} from "../validation/authValidation.js";
import { verifyToken } from "../middleware/auth.token.js";
import { verifyUser } from "../middleware/user/user-middleware.js";
const router = express.Router();
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post(
  "/update-profile",
  updateValidation,
  verifyToken,
  verifyUser,
  update
);

export default router;
