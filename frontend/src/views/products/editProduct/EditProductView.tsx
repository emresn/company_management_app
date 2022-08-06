import React from "react";
import { useSelector } from "react-redux";
import UiButton from "../../../components/ui/UiButton";
import { AppState } from "../../../redux/store";

type Props = {};

const EditProductView = (props: Props) => {
  const state = useSelector((state: AppState) => state.productState);
  return (
    <div className="w-1/3 flex flex-col gap-1 px-2">
      <h4>Edit </h4>
      {state.selectedProduct && (
        <form className="flex flex-col gap-2">
          <div className="flex flex-col mr-2">
            <label htmlFor="product_code">Code</label>
            <input
              type="text"
              className="p-1 border border-gray-500"
              name="product_code"
              id="product_code"
              value={state.selectedProduct.code}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="product_name">Name</label>
            <input
              type="text"
              className="p-1 border border-gray-500"
              name="product_name"
              id="product_name"
              value={state.selectedProduct.name}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="Weight">Weight (gr.)</label>
            <input
              type="text"
              className="p-1 border border-gray-500"
              name="Weight"
              id="Weight" 
              value={state.selectedProduct.gr}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="stock">Stock (pcs.)</label>
            <input
              type="text"
              className="p-1 border border-gray-500"
              name="stock"
              id="stock"
              value={state.selectedProduct.stock}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="p-1 border border-gray-500"
              name="description"
              id="description"
              value={state.selectedProduct.description}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="images">Images</label>
            {state.selectedProduct.images.map((e)=> <input key={e.id}
              type="text"
              className="p-1 border border-gray-500"
              name="images"
              id="images"
              value={e.href}
            />)}
          </div>

          <UiButton color="success" size="lg" text="Update" />
        </form>
      )}
    </div>
  );
};

export default EditProductView;
