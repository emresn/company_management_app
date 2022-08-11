import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initMessage, MessageModel } from "../models/messageModel";
import { AppState } from "../redux/store";
import { makeId } from "../utils/randomId";

export interface NotificationState {
  message: MessageModel;
  id : string;
}

const initialState: NotificationState = {
  message: initMessage(),
  id: ""
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
      state.id = makeId(16)
      
    },
    setNotification: (
      state: NotificationState,
      action: PayloadAction<NotificationPayload>
    ) => {
      state.message = action.payload.message;
      state.id = makeId(16)
     
    },
  },
});

export const { closeNotification, setNotification } = NotificationSlice.actions;

export const selectNotificationState = (state: AppState) =>
  state.notificationState;

export default NotificationSlice.reducer;
