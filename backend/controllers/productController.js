import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice, category, brand } =
      req.body;
    const userId = req.user._id; // ✅ Fixed: was req.id

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !category ||
      !brand
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Handle multiple images
    let productImage = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "products",
          resource_type: "image",
        });
        productImage.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newProduct = await Product.create({
      user: userId,
      productName,
      productDescription,
      productPrice,
      category, // ✅ Fixed: was catagory
      brand,
      productImage,
    });

    return res.status(201).json({
      success: true,
      product: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.productImage && product.productImage.length > 0) {
      for (const image of product.productImage) {
        const result = await cloudinary.uploader.destroy(image.public_id);
        if (result.result !== "ok") {
          console.warn(
            `Failed to delete image ${image.public_id} from Cloudinary`
          );
        }
      }
    }

    await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      category, // ✅ Fixed: was catagory
      brand,
      existingImages: existingImagesRaw,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // ✅ Fixed: parse existingImages into an array first before any filtering
    const keepIds = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];

    // Images to keep (sent by client)
    const updatedImages = product.productImage.filter((img) =>
      keepIds.includes(img.public_id)
    );

    // Images to remove (not in keepIds) — ✅ Fixed: now uses array .includes()
    const removedImages = product.productImage.filter(
      (img) => !keepIds.includes(img.public_id)
    );

    // Delete removed images from Cloudinary
    for (const image of removedImages) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Upload new images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri.content, {
          folder: "products",
          resource_type: "image",
        });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Update product fields
    product.productName = productName || product.productName;
    product.productDescription = productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category; // ✅ Fixed: was catagory
    product.brand = brand || product.brand;
    product.productImage = updatedImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};