import React, { useState } from "react";
import OrderComp from "../../components/OrderComp";

import UiButton from "../../components/ui/UiButton";
import { OrderDummy, OrderDummy2 } from "../../data/orderDummy";
import { Product } from "../../models/productModel";

const OrdersView = ({ title }: { title: string }) => {

  const [selectedProduct, setselectedProduct] = useState<Product>();
  const [selectedRow, setselectedRow] = useState<number>()


  const orderListDummy = [OrderDummy, OrderDummy2];
  return (
    <div className="flex flex-col ">
      <div id="title" className="bg-gray-300 px-4">
        <div className="flex flex-row justify-between items-center">
          <h4 className="">{title}</h4>
          <div>
            <UiButton color="success" text="New Order" size="sm" />
          </div>
        </div>
      </div>
      <div className="relative shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left text-dark dark:text-white ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Order Code
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Customer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                 Total Price
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  Order Date
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                  </svg>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orderListDummy.map((o, idx) => (
              <OrderComp o={o} key={idx} idx={idx} selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} selectedRow={selectedRow} setselectedRow={setselectedRow} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersView;
