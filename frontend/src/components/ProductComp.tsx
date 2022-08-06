import React from "react";
import { Product } from "../models/productModel";
import { dateFromString } from "../utils/dateFromString";

type Props = {
  product: Product;
  idx: number;
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ProductComp = ({ product, idx, selected, setSelected }: Props) => {
  function onClickHandler(current: number | undefined, idx: number) {
    current === idx ? setSelected(undefined) : setSelected(idx);
  }

  const productCreatedDate =
    product.createdAt === product.updatedAt
      ? `Created At : ${dateFromString(product.createdAt)}`
      : `Created At : ${dateFromString(
          product.createdAt
        )}\nUpdated : ${dateFromString(product.updatedAt)}`;
  return (
    <div
      className={`${
        selected === idx ? "bg-yellow-200" : "bg-primary-100 hover:bg-gray-50"
      } flex flex-col justify-between rounded-md p-2  border hover:border-sm hover:border-gray-400 cursor-pointer`}
      onClick={() => onClickHandler(selected, idx)}
    >
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-2 ">
          <span className="font-bold ">
            {product.name} - {product.code}
          </span>
          <div className="flex flex-col text-sm">
            <span>
              <span className="font-medium">Weight: </span> {product.gr} gr.
            </span>
            <span>
              <span className="font-medium ">In Stock:</span> {product.stock}{" "}
              pcs.
            </span>
            <div className="flex flex-col">
              <span className="font-medium ">Description:</span>
              {product.description}
            </div>
          </div>
        </div>
        <img
          className=""
          width={100}
          src={product.images[0].href}
          alt={product.name}
        />
      </div>
      <div className="flex flex-row justify-end items-end gap-1">
        <span title={productCreatedDate} className="text-xs">
          {dateFromString(product.createdAt)}
        </span>
        <img
          width={16}
          src="../assets/calendar.svg"
          alt="calendar"
          title={productCreatedDate}
        />
      </div>
    </div>
  );
};

export default ProductComp;
