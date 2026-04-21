import { createSlice } from "@reduxjs/toolkit";

// ✅ Fixed: initialState was missing
const initialState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setCart } = productSlice.actions;
export default productSlice.reducer;