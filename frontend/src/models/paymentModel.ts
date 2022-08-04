import { Customer } from "./customerModel"

export type Payment = {
    id: string,
    company: Customer,
    isReceived: boolean,
    amount: number,
    date: string,
    createdAt: string,
    updatedAt: string
}