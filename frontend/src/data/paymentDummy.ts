import { Payment } from "../models/paymentModel";
import { customerDummy } from "./customerDummy";

export const PaymentDummy:Payment = {
    id: "7c7bf98a-d762-453a-89ab-2eb503482332",
    company: customerDummy,
    isReceived: true,
    amount: 2000,
    date: "2022-06-05T00:00:00+03:00",
    createdAt: "2022-06-03T10:04:46.178001+03:00",
    updatedAt: "2022-06-03T10:04:46.178001+03:00"
}