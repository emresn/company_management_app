import { useDispatch, useSelector } from "react-redux";
import { Product } from "../models/productModel";
import { AppState } from "../redux/store";
import { dateFromString } from "../utils/dateFromString";
import {
  selectProduct,
  switchEditMode,
  unSelectProduct,
} from "../stores/productSlice";
import UiButton from "./ui/UiButton";

type Props = {
  product: Product;
  idx: number;
  isEditActive: boolean;
};

const ProductComp = ({ product, idx, isEditActive }: Props) => {
  const state = useSelector((state: AppState) => state.productState);
  const dispatch = useDispatch();

  function selectHandler(product: Product, idx: number) {
    if (
      state.selectedProduct &&
      state.selectedProduct.id === product.id &&
      state.selectedIndex === idx
    ) {
      dispatch(unSelectProduct());
    } else {
      dispatch(selectProduct({ product: product, index: idx }));
    }
  }

  function editButtonHandler() {
    dispatch(switchEditMode());
  }

  const productCreatedDate =
    product.created_at === product.updated_at
      ? `Created At : ${dateFromString(product.created_at)}`
      : `Created At : ${dateFromString(
          product.created_at
        )}\nUpdated : ${dateFromString(product.updated_at)}`;
  return (
    <div className="relative">
      {state.isSelected &&
        state.selectedProduct &&
        state.selectedProduct.id === product.id &&
        state.selectedIndex === idx && (
          <div
            onClick={() =>  editButtonHandler()}
            className="absolute top-0 right-0"
          >
            <UiButton color="success" size="sm" text="Edit" />
          </div>
        )}
      <div
        className={`${
          state.isSelected &&
          state.selectedProduct &&
          state.selectedProduct.id === product.id &&
          state.selectedIndex === idx
            ? "ring-1  ring-yellow-800"
            : ""
        } flex flex-col bg-primary-100 hover:bg-gray-50 justify-between rounded-md p-2 border hover:border-sm hover:border-gray-400 cursor-pointer h-full`}
        onClick={() => isEditActive === true && selectHandler(product, idx)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 ">
          <div className="flex flex-col gap-2 ">
            <div className="flex  flex-col font-semibold">
              <span>  {product.code}</span>
              <span> {product.name}</span>
              
            </div>
            <div className="flex flex-col text-sm">
              <span>
                <span className="font-medium">Weight: </span> {product.gr} gr.
              </span>
              <span>
                <span className="font-medium ">In Stock:</span> {product.stock}
                pcs.
              </span>
              <div className="flex flex-col">
                <span className="font-medium ">Description:</span>
                {product.description}
              </div>
            </div>
          </div>
         {product.images.length > 0 && product.images[0].href !=="" && <div><img
            className=""
            width={100}
            src={product.images[0].href}
            alt={product.name}
          /></div>}
        </div>
        <div className="flex flex-row justify-end items-end gap-1">
          <span title={productCreatedDate} className="text-xs">
            {dateFromString(product.created_at)}
          </span>
          <img
            width={16}
            src="/assets/calendar.svg"
            alt="calendar"
            title={productCreatedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductComp;
