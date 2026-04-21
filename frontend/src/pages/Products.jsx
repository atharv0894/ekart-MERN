import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterSlidebar from "@/components/FilterSlidebar";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 99999]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ekart-mern-backend.onrender.com/api/v1/product/get-all-products"
      );
      const res = await response.json();
      // ✅ Fixed: API returns res.products directly (no res.data wrapper)
      if (res.success) {
        setAllProducts(res.products);
        dispatch(setProducts(res.products));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // ✅ Fixed: using correct field names from productController:
  //    productName, productPrice, category, brand
  const filteredProducts = allProducts
    .filter((p) => {
      const matchesSearch = p.productName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "ALL" || p.category === category;
      const matchesBrand =
        brand === "ALL" || p.brand === brand;
      const matchesPrice =
        p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1];
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.productPrice - b.productPrice;
      if (sortOrder === "high-to-low") return b.productPrice - a.productPrice;
      return 0;
    });

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Filter Sidebar */}
        <FilterSlidebar
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
        />

        {/* Main product section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select onValueChange={setSortOrder} value={sortOrder}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Price</SelectLabel>
                  <SelectItem value="low-to-high">Low to High</SelectItem>
                  <SelectItem value="high-to-low">High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="shadow-lg rounded-lg overflow-hidden bg-white animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-8 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            // ✅ Added: empty state message
            <div className="flex items-center justify-center h-64 text-gray-400 text-lg">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;