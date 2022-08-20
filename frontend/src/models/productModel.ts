import { ProductImage, ProductImageWithoutID } from "./productImageModel";

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

export type ProductResponseModelWithoudID = {
  name: string;
  code: string;
  is_active: boolean;
  images: ProductImageWithoutID[];
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
  const imagesWithoutId =  ProductImagesWithoutID(p.images)
  const productUpdRequest: ProductResponseModelWithoudID = {
    name: p.name,
    code: p.code,
    is_active: p.isActive,
    images: imagesWithoutId,
    description: p.description,
    stock: p.stock,
    gr: p.gr,
  };
  return productUpdRequest;
};

export const ProductImagesWithoutID= (imageList : ProductImage[]) => {
  const newList = []
  for (const i in imageList) {
    if (Object.prototype.hasOwnProperty.call(imageList, i)) {
      const image : ProductImageWithoutID= {href: imageList[i].href}
      newList.push(image)
    }
  }
  return newList;
}
