import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthenticationUrl } from "../../constants/apiRoutes";
import { SignInRequest, AuthPayload } from "../../stores/authSlice";

export const SignInAsync = createAsyncThunk(
    "AuthState/SignInAsync",
    async (request: SignInRequest) => {
      try {
        const formData = new FormData()
        formData.append("username", request.username)
        formData.append("password", request.password)
        const response = await axios.post(AuthenticationUrl, formData);
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