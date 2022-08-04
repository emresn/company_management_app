import { ProductImage } from "./productImageModel"

export type Product={
    id:string,
    name:string,
    code:string,
    isActive:boolean,
    images: ProductImage[],
    description: string,
    stock: number,
    gr: number,
    createdAt: string,
    updatedAt: string

}