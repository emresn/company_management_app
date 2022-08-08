import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { backendProductFetchAPIUrl } from "../constants/routeConstants";
import { Product, ProductFromResponse, ProductResponseModel } from "../models/productModel";
import { AppState } from "../redux/store";

export interface ProductState {
  status: "initial" | "loading" | "failed" | "success";
  productList: Product[];
  isSelected: boolean;
  selectedProduct: Product | undefined;
  selectedIndex: number | undefined;
  editModeActive: boolean;
  isUpdateProceed: boolean;
  isDeleteProceed: boolean;
}

const initialState: ProductState = {
  status: "initial",
  productList: [],
  isSelected: false,
  selectedProduct: undefined,
  selectedIndex: undefined,
  editModeActive: false,
  isUpdateProceed: false,
  isDeleteProceed: false,
};

export const UpdateProductAsync = createAsyncThunk(
  "ProductState/UpdateProductAsync",
  async () => {
    try {
      const test = await axios.get("https://dummyjson.com/products/1");
      console.log(test);
    } catch (error) {
      throw new Error("error");
    }
  }
);

export const DeleteProductAsync = createAsyncThunk(
  "ProductState/DeleteProductAsync",
  async () => {
    try {
      const test = await axios.get("https://dummyjson.com/products/1");
      console.log(test);
    } catch (error) {
      throw new Error("error");
    }
  }
);

export const FetchProductsAsync = createAsyncThunk(
  "ProductState/FetchProductsAsync",
  async (token: string) => {
    try {
      const response = await axios.get(backendProductFetchAPIUrl, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.message;
      } else {
        throw error;
      }
    }
  }
);

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
  },

  extraReducers: (builder) => {
    builder
      .addCase(UpdateProductAsync.pending, (state) => {
        state.isUpdateProceed = true;
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.isUpdateProceed = false;
      })
      .addCase(UpdateProductAsync.rejected, (state) => {
        state.isUpdateProceed = false;
      })
      .addCase(DeleteProductAsync.pending, (state) => {
        state.isDeleteProceed = true;
      })
      .addCase(DeleteProductAsync.fulfilled, (state, action) => {
        state.isDeleteProceed = false;
      })
      .addCase(DeleteProductAsync.rejected, (state) => {
        state.isDeleteProceed = false;
      })
      .addCase(FetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchProductsAsync.fulfilled, (state, action: PayloadAction<ProductResponseModel[]>) => {
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
      })
      .addCase(FetchProductsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { selectProduct, unSelectProduct, switchEditMode } =
  productSlice.actions;

export const selectProductState = (state: AppState) => state.productState;

export default productSlice.reducer;
