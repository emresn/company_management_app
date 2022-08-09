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

export type ProductResponseModelWithoutDate = {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  images: ProductImage[];
  description: string;
  stock: number;
  gr: number;
};

export const ProductFromResponse = (res: ProductResponseModel) => {
  const product: Product = {
    id: res["id"],
    name: res["name"],
    code: res["code"],
    isActive: res["is_active"],
    images: res["images"],
    description: res["description"],
    stock: res["stock"],
    gr: res["gr"],
    createdAt: res["created_at"],
    updatedAt: res["updated_at"],
  };

  return product;
};

export const ProductEmpty: Product = {
  id: "",
  name: "",
  code: "",
  isActive: false,
  images: [{id:"", href:""}],
  description: "",
  stock: 0,
  gr: 0,
  createdAt: "",
  updatedAt: "",
};

export const ProductRequestModel = (p: Product) => {
  const productUpdRequest: ProductResponseModelWithoutDate = {
    id: p.id,
    name: p.name,
    code: p.code,
    is_active: p.isActive,
    images: p.images,
    description: p.description,
    stock: p.stock,
    gr: p.gr,
  };
  return productUpdRequest;
};


