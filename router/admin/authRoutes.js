import express from "express";
import {
  login,
  signupAdmin,
} from "../../controllers/adminControllers/authController.js";
import {
  loginValidation,
  signupValidation,
} from "../../validation/authValidation.js";

const router = express.Router();
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signupAdmin);

export default router;
