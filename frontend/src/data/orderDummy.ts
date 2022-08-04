import { OrderItem } from "../models/orderItemModel";
import { Order } from "../models/orderModel";
import { customerDummy } from "./customerDummy";
import { ProductDummy } from "./productDummy";

const OrderItemDummy:OrderItem = {
    id: "d12982b9-540a-4862-a726-4fc2e0b007e1",
    product: ProductDummy,
    quantity: 100,
    price: 14.5,
    total_price: 1450,
    status: "NS",
    isActive: true,
    createdAt: "2022-06-05T05:54:16.846086+03:00",
    updatedAt: "2022-08-04 17:51:56.525 +0300"
}

export const OrderDummy:Order = {
    id: "87cb9290-a693-4f9f-9cbc-1a4edddaf91a",
    orderNo: "2022_Q33A",
    customer: customerDummy,
    items: [OrderItemDummy],
    status: "NS",
    price: 1450,
    vat: 261,
    total_price: 1711,
    note: "note",
    date: "2022-06-05T00:00:00+03:00",
    createdAt: "2022-06-05T05:54:16.846086+03:00",
    updatedAt: "2022-08-04 17:51:56.525 +0300"
}