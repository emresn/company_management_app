import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormElement from "../../components/FormElement";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { Product, ProductEmpty } from "../../models/productModel";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { setAlert } from "../../viewModels/alertSlice";
import { deactiveMsg, UpdateProductAsync } from "../../viewModels/productSlice";

const EditProductView = () => {
  const state = useSelector((state: AppState) => state);
  const productState = state.productState;
  const authState = state.auth;
  const dispatch = useAppDispatch();
  const [productUpdated, setProductUpdated] = useState<Product>(
    productState.selectedProduct ?? ProductEmpty
  );

  useEffect(() => {
    if (
      productState.message.isActive &&
      productState.message.type === "success"
    ) {
      setTimeout(() => {
        dispatch(deactiveMsg());
      }, 2000);
    }
  }, [dispatch, productState]);

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

  return (
    <div className="w-1/3 flex flex-col gap-1 px-2 w-full">
      <h4>Edit </h4>
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

          <div className="flex flex-col mr-2">
            <label htmlFor="images">Images</label>
            {productUpdated.images.map((e, idx) => (
              <input
                key={e.id}
                type="text"
                onChange={(evt) => {
                  if (productState.selectedProduct) {
                    const imagesList =
                      productState.selectedProduct.images.filter(
                        (im) => im.id !== e.id
                      );

                    const imageUpdated = {
                      id: e.id,
                      href: evt.target.value,
                    };

                    imagesList.push(imageUpdated);

                    setProductUpdated({
                      ...productUpdated,
                      images: imagesList,
                    });
                  }
                }}
                className="p-1 border border-gray-500"
                name="images"
                id="images"
                value={e.href}
              />
            ))}
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

          <div className="flex flex-col sm:flex-row justify-between items-end">
            {productState.isUpdateProceed ? (
              <UiSpinner />
            ) : (
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
            )}
            {productState.isDeleteProceed ? (
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