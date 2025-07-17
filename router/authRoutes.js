import express from "express";
import { login, signup } from "../controllers/authController.js";

import {
  loginValidation,
  signupValidation,
} from "../validation/authValidation.js";
const router = express.Router();
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

export default router;
  