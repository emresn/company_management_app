import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendAuthenticationUrl } from "../constants/routeConstants";
import { SiteConstants } from "../constants/siteConstants";
import { AppState } from "../redux/store";

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  isProceed: boolean;
  message: string;
  username: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  isProceed: false,
  message: "",
  username : "",
};

export interface AuthPayload {
  token: string;
}
export interface SignInRequest {
  username: string;
  password: string;
}

export const SignInAsync = createAsyncThunk(
  "AuthState/SignInAsync",
  async (request: SignInRequest) => {
    try {
      const formData = new FormData()
      formData.append("username", request.username)
      formData.append("password", request.password)
      const response = await axios.post(backendAuthenticationUrl, formData);
      if (response.status === 200) {
        const payload: AuthPayload = response.data;
        return payload;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error);
        throw error.message;
      } else {
        console.log("An unexpected error occurred ", error);
        throw error;
      }
    }
  }
);

export const authSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    signOut: (state: AuthState) => {
      state.isAuthenticated = false;
      state.token = "";
      state.isProceed = false;
      state.username = "";
      localStorage.removeItem(SiteConstants.cookieKey)
      localStorage.removeItem(`${SiteConstants.cookieKey}_user`,)
    },
    checkAuthentication : (state : AuthState) => {
      const token = localStorage.getItem(SiteConstants.cookieKey)
      const username = localStorage.getItem(`${SiteConstants.cookieKey}_user`)

      if (token && token !== "") {
        state.isAuthenticated = true;
        state.token = token;
        state.username = username ?? "";
      }
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignInAsync.pending, (state) => {
        state.isProceed = true;
      })
      .addCase(SignInAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        if (action.payload) {
          state.token = action.payload?.token;
        }
        state.isProceed = false;
        state.message = "";
        state.username = action.meta.arg.username;
        localStorage.setItem(SiteConstants.cookieKey, state.token)
        localStorage.setItem(`${SiteConstants.cookieKey}_user`, action.meta.arg.username)
      })
      .addCase(SignInAsync.rejected, (state, res) => {
        state.message = `${res.error.message}`;
        state.isProceed = false;
      });
  },
});

export const { signOut, checkAuthentication } = authSlice.actions;

export const selectAlertState = (state: AppState) => state.alertState;

export default authSlice.reducer;
