import { ProductImage } from "./productImageModel";

export type Product = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  images: ProductImage[];
  description: string;
  stock: number;
  gr: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductResponseModel = {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  images: ProductImage[];
  description: string;
  stock: number;
  gr: number;
  created_at: string;
  updated_at: string;
};

export const ProductFromResponse = (res: ProductResponseModel) => {
  const product: Product = {
    isActive: res["is_active"],
    createdAt: res["created_at"],
    updatedAt: res["updated_at"],
    ...res,
  };

  return product;
};
