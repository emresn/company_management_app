import React from 'react'
import { Order } from '../../../models/orderModel'

type Props = {
    order: Order
    setisCompanyPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyPopup = ({order, setisCompanyPopupActive}: Props) => {
  return (
    <div className="absolute top-0 right-0 z-10 bg-white border border-gray-300 rounded-xl">
    <div className="relative">
      <div
        className="absolute -top-2 -right-2 z-20 bg-white rounded-full"
        onClick={() => setisCompanyPopupActive(false)}
      >
        <img width={20} src="/assets/close.svg" alt="close" />
      </div>
      <div className="flex flex-col p-2 gap-2 justify-between">
        <span className="font-semibold">{order.customer.name}</span>
        <div className="flex flex-col">
          <span className="font-semibold">Person:</span>
          {order.customer.person}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Tel:</span>
          {order.customer.telephone}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Email:</span>
          {order.customer.email}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Address:</span>
          {order.customer.address}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Bank Account:</span>
          {order.customer.bankAccount}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Tax Number:</span>
          {order.customer.taxnumber}
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompanyPopup