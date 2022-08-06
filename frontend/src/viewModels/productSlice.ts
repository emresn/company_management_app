import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/productModel";
import { AppState } from "../redux/store";

export interface ProductState {
  isSelected: boolean;
  selectedProduct: Product | undefined;
  selectedIndex: number | undefined;
  editModeActive : boolean
}

const initialState: ProductState = {
  isSelected: false,
  selectedProduct: undefined,
  selectedIndex: undefined,
  editModeActive : false
};

export const productSlice = createSlice({
  name: "ProductState",
  initialState,
  reducers: {
    switchEditMode: (state: ProductState) =>{
      state.editModeActive = !state.editModeActive
    },
    unSelectProduct: (state: ProductState) => {
      state.isSelected = false;
      state.selectedIndex = undefined;
      state.selectedProduct =undefined ;
      
    },
    selectProduct: (
      state: ProductState,
      action: PayloadAction<{ product: Product; index: number }>
    ) => {
      state.isSelected = true;
      state.selectedProduct = action.payload.product;
      state.selectedIndex = action.payload.index;
    },
  },

  extraReducers: (builder) => {},
});

export const { selectProduct, unSelectProduct,switchEditMode } = productSlice.actions;

export const selectProductState = (state: AppState) => state.productState;

export default productSlice.reducer;
