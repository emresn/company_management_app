import React from "react";
import { useSelector } from "react-redux";
import ProductComp from "../../components/ProductComp";
import { ProductDummy, ProductDummy2 } from "../../data/productDummy";
import { Product } from "../../models/productModel";
import { AppState } from "../../redux/store";
import EditProductView from "./editProduct/EditProductView";

type Props = {};

const ProductsView = (props: Props) => {
  const state = useSelector((state: AppState) => state.productState);
  const ProductList: Product[] = [
    ProductDummy,
    ProductDummy2,
    ProductDummy,
    ProductDummy2,
    ProductDummy,
    ProductDummy2,
    ProductDummy,
    ProductDummy2,
  ];

  return (
    <div className="flex flex-col ">
      <div id="title" className="bg-gray-300 px-4">
        <h4 className="">Products</h4>
      </div>

      <div className="flex flex-row ">
        <div className={`w-full grid ${state.editModeActive ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '} gap-4 p-4`}>
          {ProductList.map((e, idx) => (
            <ProductComp key={`${e.id}-${idx}`} idx={idx} product={e} />
          ))}
        </div>
        {state.editModeActive && state.selectedProduct && (
          <EditProductView />
        )}
      </div>
    </div>
  );
};

export default ProductsView;
