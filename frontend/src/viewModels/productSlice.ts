import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ProductListAPIUrl,
  SingleProductAPIUrl,
} from "../constants/apiRoutes";
import {
  initMessage,
  MessageModel,
  successMessage,
} from "../models/messageModel";
import {
  Product,
  ProductFromResponse,
  ProductRequestModel,
  ProductResponseModel,
} from "../models/productModel";
import { AppState } from "../redux/store";

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
      const response = await axios.get(ProductListAPIUrl, {
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

export const UpdateProductAsync = createAsyncThunk(
  "ProductState/UpdateProductAsync",
  async (req: { token: string; productUpdated: Product }) => {
    try {
      const productReqModel = ProductRequestModel(req.productUpdated);
      const response = await axios({
        method: "put",
        url: SingleProductAPIUrl(req.productUpdated.id),
        headers: {
          Authorization: `Token ${req.token}`,
          "Content-Type": "application/json",
        },
        data: {
          ...productReqModel,
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


export const AddProductAsync = createAsyncThunk(
  "ProductState/AddProductAsync",
  async (req: { token: string; newProduct: Product }) => {
    try {
      const productReqModel = ProductRequestModel(req.newProduct);
      const headers = {
        Authorization: `Token ${req.token}`,
        "Content-Type": "application/json",
      };

      const response = await axios({
        method: "post",
        url: ProductListAPIUrl,
        headers: headers,
        data: {
          ...productReqModel,
        },
      });
      if (response.status === 201) {
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
      .addCase(AddProductAsync.pending, (state) => {
        state.isAsyncProcessing = true;
      })
      .addCase(AddProductAsync.fulfilled, (state, action) => {
        state.isAsyncProcessing = false;
        if (action.payload) {
          const resData: ProductResponseModel = action.payload;
          const product = ProductFromResponse(resData);
          const updatedList = [...state.productList,product]
          state.productList = updatedList
          state.selectedProduct = product;
          state.isAddSuccess = true;
          state.message = successMessage("Successfully added");
        }
      })
      .addCase(AddProductAsync.rejected, (state) => {
        state.isAsyncProcessing = false;
      })
      .addCase(DeleteProductAsync.pending, (state) => {
        state.isAsyncProcessing = true;
      })
      .addCase(DeleteProductAsync.fulfilled, (state, action) => {
        state.isAsyncProcessing = false;
      })
      .addCase(DeleteProductAsync.rejected, (state) => {
        state.isAsyncProcessing = false;
      })
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
