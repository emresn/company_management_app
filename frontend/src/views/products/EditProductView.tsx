import { useSelector } from "react-redux";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { Product } from "../../models/productModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { setAlert } from "../../viewModels/alertSlice";
import { UpdateProductAsync } from "../../viewModels/productSlice";

const EditProductView = () => {
  const state = useSelector((state: AppState) => state.productState);
  const dispatch = useAppDispatch();

  function updateHandler() {
    dispatch(UpdateProductAsync());
  }

  function deleteHandler() {
    dispatch(
      setAlert({
        alertType: "warning",
        title: "Are You sure?",
        message: "This product will be deleted. Do you want to continue?",
      })
    );
    // dispatch(DeleteProductAsync());
  }
  const ProductUpdated: Product = {
    id: "",
    name: "",
    code: "",
    isActive: false,
    images: [],
    description: "",
    stock: 0,
    gr: 0,
    createdAt: "",
    updatedAt: "",
  };
  return (
    <div className="w-1/3 flex flex-col gap-1 px-2">
      <h4>Edit </h4>
      {state.selectedProduct && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col mr-2">
            <label htmlFor="product_code">Code</label>
            <input
              type="text"
              onChange={(evt) => {
                ProductUpdated.code = evt.target.value;
              }}
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
              onChange={(evt) => {
                ProductUpdated.name = evt.target.value;
              }}
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
              onChange={(evt) => {
                ProductUpdated.gr = parseFloat(evt.target.value);
              }}
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
              onChange={(evt) => {
                ProductUpdated.gr = parseInt(evt.target.value);
              }}
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
              onChange={(evt) => {
                ProductUpdated.description = evt.target.value;
              }}
              className="p-1 border border-gray-500"
              name="description"
              id="description"
              value={state.selectedProduct.description}
            />
          </div>
          <div className="flex flex-col mr-2">
            <label htmlFor="images">Images</label>
            {state.selectedProduct.images.map((e, idx) => (
              <input
                key={e.id}
                type="text"
                onChange={(evt) => {
                  ProductUpdated.images[idx].href = evt.target.value;
                }}
                className="p-1 border border-gray-500"
                name="images"
                id="images"
                value={e.href}
              />
            ))}
          </div>

          <div className="flex flex-row justify-between items-end">
            {state.isUpdateProceed ? (
              <UiSpinner />
            ) : (
              <div className="" onClick={() => updateHandler()}>
                <UiButton color="success" size="lg" text="Update" />
              </div>
            )}
            {state.isDeleteProceed ? (
              <UiSpinner />
            ) : (
              <div onClick={() => deleteHandler()}>
                <UiButton color="danger" size="sm" text="Delete Product" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductView;
