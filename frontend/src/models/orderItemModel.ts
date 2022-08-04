import { Product } from "./productModel"

export type OrderItem = {
    id: string,
    product: Product,
    quantity: number,
    price: number,
    total_price: number,
    status: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
}