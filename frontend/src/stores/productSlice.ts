import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  errorMessage,
  initMessage,
  MessageModel,
  successMessage,
} from "../models/messageModel";
import {
  Product
} from "../models/productModel";
import { AppState } from "../redux/store";
import { AddProductAsync } from "../services/product/addProducts";
import { DeleteProductAsync } from "../services/product/deleteProduct";
import { FetchProductsAsync } from "../services/product/fetchProducts";
import { UpdateProductAsync } from "../services/product/updateProduct";
import { ProductImage } from "../models/productImageModel";

export interface ProductState {
  status: "initial" | "loading" | "failed" | "success";
  productList: Product[];
  isSelected: boolean;
  selectedProduct: Product | undefined;
  selectedIndex: number | undefined;
  editModeActive: boolean;
  addModeActive: boolean;
  asyncStatus: "initial" | "loading" | "failed" | "success";
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
  asyncStatus: "initial",
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
        state.message = initMessage();
        state.isSelected = false;
        state.selectedIndex = undefined;
        state.selectedProduct = undefined;
        state.asyncStatus = "initial";
      }
    },
    switchAddMode: (state: ProductState) => {
      state.addModeActive = !state.addModeActive;
      state.message = initMessage();
      state.isSelected = false;
      state.selectedIndex = undefined;
      state.selectedProduct = undefined;
      state.asyncStatus = "initial";
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
    addImageField: (state: ProductState) => {
      const blankImage: ProductImage = { href: "", id: "" };
      if (state.selectedProduct) {
        state.selectedProduct.images.push(blankImage);
      }
    },
    removeImageField: (
      state: ProductState,
      action: PayloadAction<{ index: number }>
    ) => {
      if (state.selectedProduct) {
        state.selectedProduct.images = state.selectedProduct.images.filter(
          (e, idx) => idx !== action.payload.index
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        FetchProductsAsync.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "success";
          const productList: Product[] = [];

          if (action.payload) {
            const snapshot = action.payload;
            for (const i in snapshot) {
              if (Object.prototype.hasOwnProperty.call(snapshot, i)) {
                const element = snapshot[i];
                if (element.images.length === 0 || !element.images) {
                  element.images = [{ href: "", id: "" }];
                }
                productList.push(element);
              }
            }
          }

          state.productList = productList;
        }
      )
      .addCase(FetchProductsAsync.rejected, (state) => {
        state.status = "failed";
        state.message = errorMessage("Error while fetching product");
      })

      .addCase(AddProductAsync.pending, (state) => {
        state.asyncStatus = "loading";
      })
      .addCase(AddProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const resData: Product = action.payload;
          const product = resData;
          const updatedList = [...state.productList, product];
          state.productList = updatedList;
          state.selectedProduct = product;
          state.asyncStatus = "success";
          state.message = successMessage("Successfully added.");
        }
      })
      .addCase(AddProductAsync.rejected, (state) => {
        state.asyncStatus = "failed";
        state.message = errorMessage("Error while adding product");
      })

      .addCase(UpdateProductAsync.pending, (state) => {
        state.asyncStatus = "loading";
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const resData: Product = action.payload;
          const idx = state.productList.findIndex((e) => e.id === resData.id);
          state.productList[idx] = resData;
          state.selectedProduct = resData;
          state.asyncStatus = "success";
          state.message = successMessage("Successfully updated");
        }
      })
      .addCase(UpdateProductAsync.rejected, (state) => {
        state.asyncStatus = "failed";
        state.message = errorMessage("Error while updating product");
      })

      .addCase(DeleteProductAsync.pending, (state) => {
        state.asyncStatus = "loading";
      })
      .addCase(DeleteProductAsync.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (p) => p.id !== action.payload
        );
        state.asyncStatus = "success";
        state.message = successMessage("Successfully deleted.");
      })
      .addCase(DeleteProductAsync.rejected, (state) => {
        state.asyncStatus = "failed";
        state.message = errorMessage("Error while deleting product");
      });
  },
});

export const { selectProduct, unSelectProduct, switchEditMode, switchAddMode} =
  productSlice.actions;

export const selectProductState = (state: AppState) => state.productState;

export default productSlice.reducer;
