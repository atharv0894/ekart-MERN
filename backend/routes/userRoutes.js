import express from "express";
import {
  register,
  verify,
  reVerify,
  login,
  logout,
  forgotPassword,
  changePassword,
  verifyOTP,
  allUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify); // OTP/manual flow
router.get("/verify/:token", verify); // Email link flow

router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);
router.post("/verify-otp/:email", verifyOTP);
router.get("/all-users", isAuthenticated, isAdmin, allUsers);
router.get("/get-user/:userId", getUserById);
router.put("/update-user/:id", isAuthenticated, updateUser);

export default router;
