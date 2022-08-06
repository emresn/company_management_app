import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/productModel";
import { AppState } from "../redux/store";

export interface ProductState {
  isSelected: boolean;
  selectedProductId: string;
  selectedIndex: number | undefined;
}

const initialState: ProductState = {
  isSelected: false,
  selectedProductId: "",
  selectedIndex: undefined,
};

export const productSlice = createSlice({
  name: "ProductState",
  initialState,
  reducers: {
    unSelectProduct: (state: ProductState) => {
      state.isSelected = false;
      state.selectedIndex = undefined;
      state.selectedProductId = "";
    },
    selectProduct: (
      state: ProductState,
      action: PayloadAction<{ product: Product; index: number }>
    ) => {
      state.isSelected = true;
      state.selectedProductId = action.payload.product.id;
      state.selectedIndex = action.payload.index;
    },
  },

  extraReducers: (builder) => {},
});

export const { selectProduct, unSelectProduct } = productSlice.actions;

export const selectProductState = (state: AppState) => state.productState;

export default productSlice.reducer;
