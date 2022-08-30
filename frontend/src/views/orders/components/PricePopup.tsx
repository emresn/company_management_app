import React from "react";
import { SiteConstants } from "../../../constants/siteConstants";
import { Order } from "../../../models/orderModel";

type Props = {
  order: Order;
  setisPricePopupActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const PricePopup = ({ order, setisPricePopupActive }: Props) => {
  return (
    <div className="absolute top-0 right-0 z-10 bg-white border border-gray-300 rounded-xl">
      <div className="relative">
        <div
          className="absolute -top-2 -right-2 z-20 bg-white rounded-full"
          onClick={() => setisPricePopupActive(false)}
        >
          <img width={20} src="/assets/close.svg" alt="close" />
        </div>
        <div className="flex flex-col p-2 justify-between gap-1 ">
          <div className="flex flex-row justify-between gap-3  ">
            <span>Price</span>
            <span>${parseFloat(`${order.price}`).toFixed(2)}</span>
          </div>

          <div className="flex flex-row justify-between gap-3 ">
            <span>%{SiteConstants.vatPercent} Vat</span>
            <span>${parseFloat(`${order.vat}`).toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex flex-row justify-between gap-3 ">
            <span>Total</span>
            <span>${parseFloat(`${order.total_price}`).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePopup;
