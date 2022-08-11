import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initMessage, MessageModel } from "../models/messageModel";
import { AppState } from "../redux/store";

export interface NotificationState {
  message: MessageModel;
}

const initialState: NotificationState = {
  message: initMessage(),
};

export interface NotificationPayload {
  message: MessageModel;
}

export const NotificationSlice = createSlice({
  name: "NotificationState",
  initialState,
  reducers: {
    closeNotification: (state: NotificationState) => {
      state.message = initMessage();
    },
    setNotification: (
      state: NotificationState,
      action: PayloadAction<NotificationPayload>
    ) => {
      state.message = action.payload.message;
    },
  },
});

export const { closeNotification, setNotification } = NotificationSlice.actions;

export const selectNotificationState = (state: AppState) =>
  state.notificationState;

export default NotificationSlice.reducer;
