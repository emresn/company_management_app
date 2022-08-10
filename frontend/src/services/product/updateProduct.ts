import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SingleProductAPIUrl } from "../../constants/apiRoutes";
import { Product, ProductRequestModel } from "../../models/productModel";

export const UpdateProductAsync = createAsyncThunk(
    "ProductState/UpdateProductAsync",
    async (req: { token: string; productUpdated: Product }) => {
      try {
        const productReqModel = ProductRequestModel(req.productUpdated);
        const response = await axios({
          method: "put",
          url: SingleProductAPIUrl(req.productUpdated.id),
          headers: {
            Authorization: `Token ${req.token}`,
            "Content-Type": "application/json",
          },
          data: {
            ...productReqModel,
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
  