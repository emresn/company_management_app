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
  is_active: true,
  images: [ProductImageDummy],
  description: "Medium size",
  stock: 8000,
  gr: 15.2,
  created_at: "2022-05-26T05:53:44.531898+03:00",
  updated_at: "2022-08-03T21:44:41.245052+03:00",
};

export const ProductDummy2: Product = {
  id: "db080120-cc5e-4735-a2f8-fa573706e979",
  name: "Laptop A Brand",
  code: "AF_6960",
  is_active: true,
  images: [
    {
      id: "b7a9f17b-0aae-4fb8-b566-68c2e34b9b34",
      href: "https://res.cloudinary.com/dc0uxmplw/image/upload/w_150,h_150,c_fill/v1625823646/products/laptop-tranmautritam-69432_mllluy.jpg",
    },
    {
      href: "https://res.cloudinary.com/dc0uxmplw/image/upload/v1624813414/products/computer_1_blkizw.jpg",
      id: "v1624813414",
    },
  ],
  description: '15" LED',
  stock: 50,
  gr: 1200,
  created_at: "2022-05-27T16:03:25.122580+03:00",
  updated_at: "2022-05-27T16:03:25.122580+03:00",
};
