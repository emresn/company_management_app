import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderListAPIUrl } from "../../constants/apiRoutes";

export const FetchOrdersAsync = createAsyncThunk(
    "ProductState/FetchOrdersAsync",
    async (token: string) => {
      try {
        const response = await axios.get(OrderListAPIUrl, {
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