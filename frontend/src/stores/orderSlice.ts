import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  errorMessage,
  initMessage,
  MessageModel,
} from "../models/messageModel";
import { Product } from "../models/productModel";
import { AppState } from "../redux/store";
import {
  Order,
 
} from "../models/orderModel";
import { FetchOrdersAsync } from "../services/order/fetchOrders";

export interface OrderState {
  status: "initial" | "loading" | "failed" | "success";
  orderList: Order[];
  isSelected: boolean;
  selectedProduct: Product | undefined;
  selectedIndex: number | undefined;
  editModeActive: boolean;
  addModeActive: boolean;
  asyncStatus: "initial" | "loading" | "failed" | "success";
  message: MessageModel;
}

const initialState: OrderState = {
  status: "initial",
  orderList: [],
  isSelected: false,
  selectedProduct: undefined,
  selectedIndex: undefined,
  editModeActive: false,
  addModeActive: false,
  asyncStatus: "initial",
  message: initMessage(),
};

export const orderSlice = createSlice({
  name: "OrderState",
  initialState,
  reducers: {
    unSelectProduct: (state: OrderState) => {
      state.isSelected = false;
      state.selectedIndex = undefined;
      state.selectedProduct = undefined;
      state.editModeActive = false;
    },
    selectProduct: (
      state: OrderState,
      action: PayloadAction<{ product: Product; index: number }>
    ) => {
      state.isSelected = true;
      state.selectedProduct = action.payload.product;
      state.selectedIndex = action.payload.index;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        FetchOrdersAsync.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = "success";
          const orderList: Order[] = [];

          if (action.payload) {
            const snapshot = action.payload;
            for (const i in snapshot) {
              if (Object.prototype.hasOwnProperty.call(snapshot, i)) {
                const item = snapshot[i];

                orderList.push(item);
              }
            }
          }

          state.orderList = orderList;
        }
      )
      .addCase(FetchOrdersAsync.rejected, (state) => {
        state.status = "failed";
        state.message = errorMessage("Error while fetching product");
      });
  },
});

export const { selectProduct, unSelectProduct } = orderSlice.actions;

export const selectOrderState = (state: AppState) => state.orderState;

export default orderSlice.reducer;
