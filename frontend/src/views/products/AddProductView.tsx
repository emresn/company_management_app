import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormElement from "../../components/FormElement";
import ImageForm from "../../components/ImageForm";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { FormValidationError } from "../../models/formValidationErrorModel";
import { Product, ProductEmpty } from "../../models/productModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { AddProductAsync } from "../../services/product/addProducts";
import { setNotification } from "../../stores/notificationSlice";
import { switchAddMode } from "../../stores/productSlice";
import { productFormValidation } from "../../utils/productFormValidation";

const AddProductView = () => {
  const state = useSelector((state: AppState) => state);
  const productState = state.productState;
  const authState = state.auth;
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState<Product>(ProductEmpty);
  const [formValidationErrors, setFormValidationErrors] = useState<
    FormValidationError[]
  >([]);

  useEffect(() => {
    if (productState.asyncStatus === "success") {
      setNewProduct(ProductEmpty);
    }
    if (
      productState.asyncStatus === "success" ||
      productState.asyncStatus === "failed"
    ) {
      dispatch(
        setNotification({
          message: productState.message,
        })
      );
      dispatch(switchAddMode());
    }
  }, [dispatch, productState]);

  function addHandler() {
    setFormValidationErrors([])
    const validation = productFormValidation( 
      newProduct,
      setFormValidationErrors
    );
    if (validation === true) {
      dispatch(
        AddProductAsync({
          token: authState.token,
          newProduct: newProduct,
        })
      );
    }
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
          formValidationErrors={formValidationErrors}
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
          formValidationErrors={formValidationErrors}
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
          formValidationErrors={formValidationErrors}
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
          formValidationErrors={formValidationErrors}
          type={"text"}
          onChange={(evt) => {
            setNewProduct({
              ...newProduct,
              description: evt.target.value,
            });
          }}
        />

        <ImageForm
          productUpdated={newProduct} formValidationErrors={formValidationErrors}
          setProductUpdated={setNewProduct}
        />

        {productState.asyncStatus === "loading" ? (
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
