import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormElement from "../../components/FormElement";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { Product, ProductEmpty } from "../../models/productModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { AddProductAsync } from "../../services/product/addProducts";
import {
  deactiveMsg,
  switchAddMode,
} from "../../stores/productSlice";

const AddProductView = () => {
  const state = useSelector((state: AppState) => state);
  const productState = state.productState;
  const authState = state.auth;
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState<Product>(ProductEmpty);

  useEffect(() => {
    if (
      productState.message.isActive &&
      productState.message.type === "success"
    ) {
      setTimeout(() => {
        dispatch(deactiveMsg());
      }, 2000);
    }

    if (productState.isAddSuccess) {
      setNewProduct(ProductEmpty);
    }
  }, [dispatch, productState]);

  function addHandler() {
    dispatch(
      AddProductAsync({
        token: authState.token,
        newProduct: newProduct,
      })
    );
  }

  return (
    <div className="w-1/3 flex flex-col gap-1 px-2 w-full">
      <div className="flex flex-row justify-between items-center">
        <h4>New Product</h4>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(switchAddMode())}
        >
          <img width={24} src="/assets/close.svg" alt="close"></img>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <FormElement
          id={"product_name"}
          label={"Name"}
          value={newProduct.name}
          type={"text"}
          onChange={(evt) => {
            setNewProduct({
              ...newProduct,
              name: evt.target.value,
            });
          }}
        />

        <FormElement
          id={"product_weight"}
          label={"Weight (gr.)"}
          value={newProduct.gr}
          type={"number"}
          step={0.1}
          onChange={(evt) => {
            setNewProduct({
              ...newProduct,
              gr: parseFloat(evt.target.value),
            });
          }}
        />

        <FormElement
          id={"product_stock"}
          label={"Stock (pcs.)"}
          value={newProduct.stock}
          type={"number"}
          step={1}
          onChange={(evt) => {
            setNewProduct({
              ...newProduct,
              stock: parseInt(evt.target.value),
            });
          }}
        />

        <FormElement
          id={"product_description"}
          label={"Description"}
          value={newProduct.description}
          type={"text"}
          onChange={(evt) => {
            setNewProduct({
              ...newProduct,
              description: evt.target.value,
            });
          }}
        />

        <div className="flex flex-col mr-2">
          <label htmlFor="images">Images</label>
          <input
            type="text"
            onChange={(evt) => {
              const imagesList = [];

              const image = {
                id: "",
                href: evt.target.value,
              };

              imagesList.push(image);

              setNewProduct({
                ...newProduct,
                images: imagesList,
              });
            }}
            className="p-1 border border-gray-500"
            name="images"
            id="images"
            value={newProduct.images[0].href || ""}
          />
        </div>

        {productState.message.isActive && (
          <div
            className={
              productState.message.type === "error"
                ? "text-red-600"
                : productState.message.type === "success"
                ? "text-cinder-600"
                : productState.message.type === "warning"
                ? "text-yellow-800"
                : "text-dark"
            }
          >
            {productState.message.text}
          </div>
        )}

        {productState.isAsyncProcessing ? (
          <UiSpinner />
        ) : (
          <div
            className=""
            onClick={() => {
              addHandler();
            }}
          >
            <UiButton color="success" size="lg" text="Add Product" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductView;
