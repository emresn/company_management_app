import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductListAPIUrl } from "../../constants/apiRoutes";

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