import React from "react";
import { Order } from "../models/orderModel";
import { Product } from "../models/productModel";
import { dateFromString } from "../utils/dateFromString";
import ProductComp from "./ProductComp";

type Props = {
  o: Order;
  idx: number;
  selectedProduct: Product | undefined;
  setselectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  selectedRow: number | undefined;
  setselectedRow: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const OrderComp = ({ o, selectedProduct, setselectedProduct, selectedRow,idx,
  setselectedRow }: Props) => {

  function setProductHandler(p: Product | undefined) {
    if ((selectedProduct && p && selectedProduct.id !== p.id)|| selectedProduct === undefined || (selectedProduct && p && selectedProduct.id === p.id && selectedRow !== idx)) {
      setselectedProduct(p);
    }  else {
      setselectedProduct(undefined);
    }
    setselectedRow(idx)
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {o.orderNo}
      </th>
      <td className="py-4 px-6 relative">
        <ul>
          {o.items.map((i, index) => (
            <div key={index}>
              <li
                className="list-disc hover:underline"
                onClick={() => setProductHandler(i.product)}
                key={index}
              >
                {i.product.name} - {i.quantity} pcs.
              </li>
              {selectedProduct !== undefined && selectedRow === idx && (
                <div className="absolute top-0 right-0 z-10 bg-white border border-gray-300 rounded-xl">
                  <div className="relative">
                    <div
                      className="absolute -top-2 -right-2 z-20 bg-white rounded-full"
                      onClick={() => setProductHandler(undefined)}
                    >
                     
                      <img width={20} src="/assets/close.svg" alt="close" />
                    </div>
                    <ProductComp
                      product={selectedProduct}
                      idx={index}
                      isEditActive={false}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </td>
      <td className="py-4 px-6">{o.customer.name}</td>
      <td className="py-4 px-6">${o.total_price}</td>
      <td className="py-4 px-6">{dateFromString(o.createdAt)}</td>
      <td className="py-4 px-6 text-right">
        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Edit
        </span>
      </td>
    </tr>
  );
};

export default OrderComp;
