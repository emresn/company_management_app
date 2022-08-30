import { Customer } from "./customerModel"
import { Product } from "./productModel"

export type OrderItem = {
    id: string,
    product: Product,
    quantity: number,
    price: number,
    total_price: number,
    status: string,
    is_active: boolean,
    created_at: string,
    updated_at: string,
}


export type Order = {
    id: string,
    order_no: string,
    customer: Customer,
    items: OrderItem[],
    status: string,
    price: number,
    vat: number,
    total_price: number,
    note: string,
    date: string,
    created_at: string,
    updated_at: string

}
