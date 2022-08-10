import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initMessage, MessageModel } from "../models/messageModel";
import { AppState } from "../redux/store";

export interface AlertState {
  title: string;
  message: MessageModel;
  isApproved: boolean;
  
}

const initialState: AlertState = {
  title: "",
  message: initMessage(),
  isApproved: false,
  
};

export interface AlertPayload {
  title: string;
  message: MessageModel;
}

export const alertSlice = createSlice({
  name: "AlertState",
  initialState,
  reducers: {
    closeAlert: (state: AlertState) => {
      state.title= ""
      state.message = initMessage()
      state.isApproved= false
    },
    setAlert: (state: AlertState, action: PayloadAction<AlertPayload>) => {
      state.message = action.payload.message;
      state.title = action.payload.title;
    },
    switchisApproved: (state: AlertState, action :PayloadAction<boolean>) => {
      state.isApproved = action.payload;
    },
    

  },
});

export const { closeAlert, setAlert, switchisApproved } = alertSlice.actions;

export const selectAlertState = (state: AppState) => state.alertState;

export default alertSlice.reducer;
