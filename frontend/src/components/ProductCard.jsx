import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "https://ekart-mern-backend.onrender.com/api/v1/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Added to cart successfully");
        // TODO: show a toast / update cart count in Redux
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const {
    _id,
    productName,
    productPrice,
    productDescription,
    productImage,
    category,
    brand,
  } = product;

  const imageUrl =
    productImage && productImage.length > 0
      ? productImage[0].url
      : "/placeholder.png";

  return (
    <div
      onClick={() => navigate(`/product/${_id}`)}
      className="shadow-lg rounded-lg overflow-hidden bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200"
    >
      {/* Product Image */}
      <div className="w-full h-36 md:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Product Info */}
      <div className="p-2 md:p-3 space-y-1">
        <h2 className="font-semibold text-xs md:text-sm text-gray-800 truncate">
          {productName}
        </h2>
        <p className="text-xs text-gray-500 truncate hidden sm:block">
          {productDescription}
        </p>
        <p className="text-xs text-gray-400">
          {brand} · {category}
        </p>
        <p className="font-bold text-sm md:text-base text-gray-900">
          ₹{productPrice}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(_id); // ✅ actually calls addToCart now
          }}
          className="w-full mt-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm rounded transition-colors duration-150"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;