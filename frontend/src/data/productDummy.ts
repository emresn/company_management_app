import { ProductImage } from "../models/productImageModel";
import { Product } from "../models/productModel";

const ProductImageDummy: ProductImage = {
  id: "d5e4a092-fc7b-43e2-be59-bf7006443a6b",
  href: "https://res.cloudinary.com/dc0uxmplw/image/upload/w_150,h_150,c_fill/v1624813412/products/smartphone3_wjsc1j.jpg",
};

export const ProductDummy: Product = {
  id: "70193131-139a-49ee-b42b-14578eaf2810",
  name: "Smartphone 6SE Black",
  code: "SX_9251",
  isActive: true,
  images: [ProductImageDummy],
  description: "Medium size",
  stock: 8000,
  gr: 15.2,
  createdAt: "2022-05-26T05:53:44.531898+03:00",
  updatedAt: "2022-08-03T21:44:41.245052+03:00",
};
