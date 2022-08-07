import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../redux/store";

export interface AlertState {
  alertType: "none" | "success" | "warning" | "danger";
  title: string;
  message: string;
}

const initialState: AlertState = {
  alertType: "none",
  title: "",
  message: "",
};

export interface AlertPayload {
  alertType: "none" | "success" | "warning" | "danger",
  title: string,
  message:string,
}

export const alertSlice = createSlice({
  name: "AlertState",
  initialState,
  reducers: {
    closeAlert: (state: AlertState) => {
      state.alertType = "none";
      state.message = "";
      state.title = "";
    },
    setAlert: (state: AlertState, action: PayloadAction<AlertPayload> ) => {
      state.alertType = action.payload.alertType;
      state.message = action.payload.message;
      state.title = action.payload.title;
    },
  },
 
});

export const { closeAlert,setAlert } = alertSlice.actions;

export const selectAlertState = (state: AppState) => state.alertState;

export default alertSlice.reducer;
