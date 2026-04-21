import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"; // ✅ Protect all cart routes

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.put("/update", isAuthenticated, updateQuantity);
router.delete("/remove", isAuthenticated, removeFromCart);

export default router;