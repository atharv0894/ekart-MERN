import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const navigate = useNavigate();

  // ✅ Destructure using correct field names from productController:
  //    productName, productPrice, productDescription, productImage
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
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-1">
        <h2 className="font-semibold text-sm text-gray-800 truncate">
          {productName}
        </h2>
        <p className="text-xs text-gray-500 truncate">{productDescription}</p>
        <p className="text-xs text-gray-400">
          {brand} · {category}
        </p>
        <p className="font-bold text-base text-gray-900">₹{productPrice}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            navigate(`/product/${_id}`);
          }}
          className="w-full mt-1 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors duration-150"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
