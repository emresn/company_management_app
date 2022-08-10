import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductListAPIUrl } from "../../constants/apiRoutes";
import { Product, ProductRequestModel } from "../../models/productModel";


export const AddProductAsync = createAsyncThunk(
    "ProductState/AddProductAsync",
    async (req: { token: string; newProduct: Product }) => {
      try {
        const productReqModel = ProductRequestModel(req.newProduct);
        const headers = {
          Authorization: `Token ${req.token}`,
          "Content-Type": "application/json",
        };
  
        const response = await axios({
          method: "post",
          url: ProductListAPIUrl,
          headers: headers,
          data: {
            ...productReqModel,
          },
        });
        if (response.status === 201) {
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