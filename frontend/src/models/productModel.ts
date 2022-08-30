import { ProductImage, ProductImageWithoutID } from "./productImageModel";

export type Product = {
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



export type ProductWithoudID = {
  name: string;
  code: string;
  is_active: boolean;
  images: ProductImageWithoutID[];
  description: string;
  stock: number;
  gr: number;
};



export const ProductEmpty: Product = {
  id: "",
  name: "",
  code: "",
  is_active: false,
  images: [{id:"", href:""}],
  description: "",
  stock: 0,
  gr: 0,
  created_at: "",
  updated_at: "",
};

export const ProductRequestModel = (p: Product) => {
  const imagesWithoutId =  ProductImagesWithoutID(p.images)
  const productUpdRequest: ProductWithoudID = {
    name: p.name,
    code: p.code,
    is_active: p.is_active,
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
      if (image.href !== "") {
        newList.push(image)
      }
     
    }
  }
  return newList;
}
