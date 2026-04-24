import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SlidersHorizontal, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const FilterContent = () => (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white p-2 rounded-md border-2 border-gray-300 w-full"
      />

      <div>
        <h1 className="font-semibold text-xl mb-2">Category</h1>
        <div className="flex flex-col gap-2">
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
      </div>

      <div>
        <h1 className="font-semibold text-xl mb-2">Brand</h1>
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
      </div>

      <div>
        <h1 className="font-semibold text-xl mb-2">Price Range</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            ₹{priceRange[0]} - ₹{priceRange[1]}
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
            className="w-full"
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
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={handleReset}
        className="w-full p-2 bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg font-semibold transition-colors"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-[85%] max-w-sm bg-gray-100 h-full overflow-y-auto p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64 shrink-0">
        <FilterContent />
      </div>
    </>
  );
};

export default FilterSlidebar;