import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";
const router = express.Router();

router.post(
  "/add-product",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  addProduct,
);
router.get("/get-all-products", getAllProducts);
router.delete(
  "/delete-product/:productId",
  isAuthenticated,
  isAdmin,
  deleteProduct,
);
router.put(
  "/update-product/:productId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct,
);

export default router;
