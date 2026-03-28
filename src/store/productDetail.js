
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.product = action.payload;
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;