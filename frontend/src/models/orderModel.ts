import { Customer } from "./customerModel"
import { OrderItem } from "./orderItemModel"

export type Order = {
    id: string,
    orderNo: string,
    customer: Customer,
    items: OrderItem[],
    status: string,
    price: number,
    vat: number,
    total_price: number,
    note: string,
    date: string,
    createdAt: string,
    updatedAt: string

}