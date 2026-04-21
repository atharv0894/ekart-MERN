import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const FilterSlidebar = ({
  allProducts = [],
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  brand,
  setBrand,
}) => {
  // ✅ Fixed: using p.category and p.brand (these match productController field names)
  const uniqueCategories = [
    "ALL",
    ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ];

  const uniqueBrands = [
    "ALL",
    ...new Set(allProducts.map((p) => p.brand).filter(Boolean)),
  ];

  const handleReset = () => {
    setSearchTerm("");
    setCategory("ALL");
    setBrand("ALL");
    setPriceRange([0, 99999]);
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">

      {/* ✅ Search by productName */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white p-2 rounded-md border-2 border-gray-300 w-full"
      />

      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategories.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              id={`category-${item}`}
              name="category"
              checked={category === item}
              onChange={() => setCategory(item)}
            />
            <Label htmlFor={`category-${item}`}>{item}</Label>
          </div>
        ))}
      </div>

      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        {uniqueBrands.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* ✅ Price range uses productPrice field */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([
                Math.min(Number(e.target.value), priceRange[1]),
                priceRange[1],
              ])
            }
            className="w-20 p-1 border border-gray-300 rounded"
          />
          <input
            type="number"
            min={priceRange[0]}
            max="99999"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([
                priceRange[0],
                Math.max(Number(e.target.value), priceRange[0]),
              ])
            }
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>
        <input
          type="range"
          min="0"
          max="99999"
          step="100"
          value={priceRange[0]}
          onChange={(e) =>
            setPriceRange([
              Math.min(Number(e.target.value), priceRange[1] - 100),
              priceRange[1],
            ])
          }
          className="w-full border border-gray-300 rounded"
        />
        <input
          type="range"
          min="0"
          max="99999"
          step="100"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([
              priceRange[0],
              Math.max(Number(e.target.value), priceRange[0] + 100),
            ])
          }
          className="w-full border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleReset}
        className="w-full p-1 bg-blue-500 text-white rounded mt-5"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSlidebar;