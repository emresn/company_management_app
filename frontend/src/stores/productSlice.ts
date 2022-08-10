import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  errorMessage,
  initMessage,
  MessageModel,
  successMessage,
} from "../models/messageModel";
import {
  Product,
  ProductFromResponse,
  ProductResponseModel,
} from "../models/productModel";
import { AppState } from "../redux/store";
import { AddProductAsync } from "../services/product/addProducts";
import { DeleteProductAsync } from "../services/product/deleteProduct";
import { FetchProductsAsync } from "../services/product/fetchProducts";
import { UpdateProductAsync } from "../services/product/updateProduct";

export interface ProductState {
  status: "initial" | "loading" | "failed" | "success";
  productList: Product[];
  isSelected: boolean;
  selectedProduct: Product | undefined;
  selectedIndex: number | undefined;
  editModeActive: boolean;
  addModeActive: boolean;
  isAddSuccess: boolean;
  isAsyncProcessing: boolean;
  message: MessageModel;
}

const initialState: ProductState = {
  status: "initial",
  productList: [],
  isSelected: false,
  selectedProduct: undefined,
  selectedIndex: undefined,
  editModeActive: false,
  addModeActive: false,
  isAddSuccess: false,
  isAsyncProcessing: false,
  message: initMessage(),
};





export const productSlice = createSlice({
  name: "ProductState",
  initialState,
  reducers: {
    switchEditMode: (state: ProductState) => {
      state.editModeActive = !state.editModeActive;
      if (state.editModeActive === false) {
        state.isSelected = false;
        state.selectedIndex = undefined;
        state.selectedProduct = undefined;
        state.editModeActive = false;
      }
    },
    switchAddMode: (state: ProductState) => {
      state.addModeActive = !state.addModeActive;
    },
    unSelectProduct: (state: ProductState) => {
      state.isSelected = false;
      state.selectedIndex = undefined;
      state.selectedProduct = undefined;
      state.editModeActive = false;
    },
    selectProduct: (
      state: ProductState,
      action: PayloadAction<{ product: Product; index: number }>
    ) => {
      state.isSelected = true;
      state.selectedProduct = action.payload.product;
      state.selectedIndex = action.payload.index;
    },
    deactiveMsg: (state: ProductState) => {
      state.message.isActive = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        FetchProductsAsync.fulfilled,
        (state, action: PayloadAction<ProductResponseModel[]>) => {
          state.status = "success";
          const productList: Product[] = [];

          if (action.payload) {
            const resData = action.payload;
            for (const i in resData) {
              if (Object.prototype.hasOwnProperty.call(resData, i)) {
                const productRes = resData[i];
                productList.push(ProductFromResponse(productRes));
              }
            }
          }

          state.productList = productList;
        }
      )
      .addCase(FetchProductsAsync.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(AddProductAsync.pending, (state) => {
        state.isAsyncProcessing = true;
      })
      .addCase(AddProductAsync.fulfilled, (state, action) => {
        state.isAsyncProcessing = false;
        if (action.payload) {
          const resData: ProductResponseModel = action.payload;
          const product = ProductFromResponse(resData);
          const updatedList = [...state.productList, product];
          state.productList = updatedList;
          state.selectedProduct = product;
          state.isAddSuccess = true;
          state.message = successMessage("Successfully added");
        }
      })
      .addCase(AddProductAsync.rejected, (state) => {
        state.isAsyncProcessing = false;
        state.message = errorMessage("Error");
      })

      .addCase(UpdateProductAsync.pending, (state) => {
        state.isAsyncProcessing = true;
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.isAsyncProcessing = false;
        if (action.payload) {
          const resData: ProductResponseModel = action.payload;
          const idx = state.productList.findIndex((e) => e.id === resData.id);
          state.productList[idx] = ProductFromResponse(resData);
          state.selectedProduct = ProductFromResponse(resData);
          state.message = successMessage("Successfully updated");
        }
      })
      .addCase(UpdateProductAsync.rejected, (state) => {
        state.isAsyncProcessing = false;
      })

      .addCase(DeleteProductAsync.pending, (state) => {
        state.isAsyncProcessing = true;
      })
      .addCase(DeleteProductAsync.fulfilled, (state, action) => {
        state.isAsyncProcessing = false;
        state.productList = state.productList.filter(
          (p) => p.id !== action.payload
        );
        state.isSelected = false;
        state.selectedIndex = undefined;
        state.selectedProduct = undefined;
        state.editModeActive = false;
      })
      .addCase(DeleteProductAsync.rejected, (state) => {
        state.isAsyncProcessing = false;
        state.message = errorMessage("Error");
      });
  },
});

export const {
  selectProduct,
  unSelectProduct,
  switchEditMode,
  deactiveMsg,
  switchAddMode,
} = productSlice.actions;

export const selectProductState = (state: AppState) => state.productState;

export default productSlice.reducer;
