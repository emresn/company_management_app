import React from "react";
import ProductComp from "../../components/ProductComp";
import { ProductDummy, ProductDummy2 } from "../../data/productDummy";
import { Product } from "../../models/productModel";

type Props = {};

const ProductsView = (props: Props) => {
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

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {ProductList.map((e, idx) => (
          <ProductComp key={`${e.id}-${idx}`} idx={idx} product={e} />
        ))}
      </div>
    
    </div>
  );
};

export default ProductsView;
