import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SingleProductAPIUrl } from "../../constants/apiRoutes";

export const DeleteProductAsync = createAsyncThunk(
    "ProductState/DeleteProductAsync",
    async (req: { token: string; id: string }) => {
      try {
        const response = await axios({
          method: "delete",
          url: SingleProductAPIUrl(req.id),
          headers: {
            Authorization: `Token ${req.token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          return req.id;
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