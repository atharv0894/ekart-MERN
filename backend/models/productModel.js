import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productName: { type: String, required: true, trim: true },
    productDescription: { type: String, required: true, trim: true },
    productImage: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    productPrice: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true }, // ✅ Correct spelling (matches controller)
    brand: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);