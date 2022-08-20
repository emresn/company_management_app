import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormElement from "../../components/FormElement";
import ImageForm from "../../components/ImageForm";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { warningMessage } from "../../models/messageModel";
import { Product, ProductEmpty } from "../../models/productModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { DeleteProductAsync } from "../../services/product/deleteProduct";
import { UpdateProductAsync } from "../../services/product/updateProduct";
import { closeAlert, setAlert } from "../../stores/alertSlice";
import { setNotification } from "../../stores/notificationSlice";
import { switchEditMode } from "../../stores/productSlice";

const EditProductView = () => {
  const state = useSelector((state: AppState) => state);
  const productState = state.productState;
  const authState = state.auth;
  const alertState = state.alertState;
  const notificationState = state.notificationState;

  const dispatch = useAppDispatch();
  const [productUpdated, setProductUpdated] = useState<Product>(
    productState.selectedProduct ?? ProductEmpty
  );

  useEffect(() => {
    if (alertState.isApproved) {
      dispatch(
        DeleteProductAsync({
          token: authState.token,
          id: productUpdated.id,
        })
      );
      dispatch(closeAlert());
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
      dispatch(switchEditMode());
    }
  }, [
    dispatch,
    productState,
    alertState,
    productUpdated,
    authState,
    notificationState,
  ]);

  if (
    productState.selectedProduct &&
    productState.selectedProduct.id !== productUpdated.id
  ) {
    setProductUpdated(productState.selectedProduct);
  }

  function updateHandler(id: string) {
    dispatch(
      UpdateProductAsync({
        token: authState.token,
        productUpdated: productUpdated,
      })
    );
  }

  function deleteWarning() {
    dispatch(
      setAlert({
        title: "Are You sure?",
        message: warningMessage(
          "This product will be deleted. Do you want to continue?"
        ),
      })
    );
  }

  const Buttons = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-end">
        <div
          className=""
          onClick={() => {
            if (productState.selectedProduct) {
              updateHandler(productState.selectedProduct.id);
            }
          }}
        >
          <UiButton color="success" size="lg" text="Update" />
        </div>
        <div onClick={() => deleteWarning()}>
          <UiButton color="danger" size="sm" text="Delete Product" />
        </div>
      </div>
    );
  };
  return (
    <div className="w-1/3 flex flex-col gap-1 px-2 w-full">
      <div className="flex flex-row justify-between items-center">
        <h4>Edit </h4>
        <div
          className="cursor-pointer"
          onClick={() => dispatch(switchEditMode())}
        >
          <img width={24} src="/assets/close.svg" alt="close"></img>
        </div>
      </div>
      {productState.selectedProduct && (
        <div className="flex flex-col gap-2">
          <FormElement
            id={"product_code"}
            label={"Product Code"}
            value={productUpdated.code}
            type={"text"}
            onChange={(evt) => {
              setProductUpdated({
                ...productUpdated,
                code: evt.target.value,
              });
            }}
          />

          <FormElement
            id={"product_name"}
            label={"Name"}
            value={productUpdated.name}
            type={"text"}
            onChange={(evt) => {
              setProductUpdated({
                ...productUpdated,
                name: evt.target.value,
              });
            }}
          />

          <FormElement
            id={"product_weight"}
            label={"Weight (gr.)"}
            value={productUpdated.gr}
            type={"number"}
            step={0.1}
            onChange={(evt) => {
              setProductUpdated({
                ...productUpdated,
                gr: parseFloat(evt.target.value),
              });
            }}
          />

          <FormElement
            id={"product_stock"}
            label={"Stock (pcs.)"}
            value={productUpdated.stock}
            type={"number"}
            step={1}
            onChange={(evt) => {
              setProductUpdated({
                ...productUpdated,
                stock: parseInt(evt.target.value),
              });
            }}
          />

          <FormElement
            id={"product_description"}
            label={"Description"}
            value={productUpdated.description}
            type={"text"}
            onChange={(evt) => {
              setProductUpdated({
                ...productUpdated,
                description: evt.target.value,
              });
            }}
          />

          <ImageForm
            productUpdated={productUpdated}
            setProductUpdated={setProductUpdated}
          />

          {productState.asyncStatus === "loading" ? <UiSpinner /> : <Buttons />}
        </div>
      )}
    </div>
  );
};

export default EditProductView;
