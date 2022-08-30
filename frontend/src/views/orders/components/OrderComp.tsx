import React from "react";
import { Order } from "../../../models/orderModel";
import { Product } from "../../../models/productModel";
import { dateFromString } from "../../../utils/dateFromString";
import CompanyPopup from "./CompanyPopup";
import ProductComp from "../../../components/ProductComp";
import PricePopup from "./PricePopup";

type Props = {
  o: Order;
  idx: number;
  selectedProduct: Product | undefined;
  setselectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  selectedRow: number | undefined;
  setselectedRow: React.Dispatch<React.SetStateAction<number | undefined>>;
  isCompanyPopupActive: boolean;
  setisCompanyPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
  isPricePopupActive: boolean;
  setisPricePopupActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderComp = ({
  o,
  selectedProduct,
  setselectedProduct,
  selectedRow,
  idx,
  setselectedRow,
  isCompanyPopupActive,
  setisCompanyPopupActive,
  isPricePopupActive,
  setisPricePopupActive,
}: Props) => {
  function setProductHandler(p: Product | undefined) {
    if (
      (selectedProduct && p && selectedProduct.id !== p.id) ||
      selectedProduct === undefined ||
      (selectedProduct &&
        p &&
        selectedProduct.id === p.id &&
        selectedRow !== idx)
    ) {
      setselectedProduct(p);
    } else {
      setselectedProduct(undefined);
    }
    setselectedRow(idx);
  }

  function setCompanyPopupHandler(val: boolean) {
    setisCompanyPopupActive(val);
    setselectedRow(idx);
  }


  function setPricePopupHandler(val: boolean) {
    setisPricePopupActive(val);
    setselectedRow(idx);
  }


  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {o.order_no}
      </th>
      <td className="py-4 px-6 relative">
        <ul>
          {o.items.map((i, index) => (
            <div key={index}>
              <li className="list-disc " key={index}>
                <span
                  className="hover:underline"
                  onClick={() => setProductHandler(i.product)}
                >
                  {i.product.name} - {i.quantity} pcs.
                </span>
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
      <td className="py-4 px-6 relative">
        <span
          onClick={() => setCompanyPopupHandler(true)}
          className="hover:underline"
        >
          {o.customer.name}
        </span>

        {isCompanyPopupActive === true && selectedRow === idx && (
          <CompanyPopup
            order={o}
            setisCompanyPopupActive={setisCompanyPopupActive}
          />
        )}
      </td>
      <td className="py-4 px-6 relative">
        <span
          onClick={() => setPricePopupHandler(true)}
          className="hover:underline"
        >
          ${parseFloat(`${o.total_price}`).toFixed(2)}
        </span>

        {isPricePopupActive === true && selectedRow === idx && (
          <PricePopup order={o} setisPricePopupActive={setisPricePopupActive} />
        )}
      </td>
      <td className="py-4 px-6">{dateFromString(o.created_at)}</td>
      <td className="py-4 px-6 text-right">
        <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Edit
        </span>
      </td>
    </tr>
  );
};

export default OrderComp;
