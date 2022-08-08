import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductComp from "../../components/ProductComp";
import UiSpinner from "../../components/ui/UiSpinner";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { FetchProductsAsync } from "../../viewModels/productSlice";
import EditProductView from "./components/EditProductView";

const ProductsView = () => {
  const state = useSelector((state: AppState) => state);
  const productState = state.productState;
  const authState = state.auth;

  const dispatch = useAppDispatch();

  useEffect(() => {
    productState.status === "initial" &&
      dispatch(FetchProductsAsync(authState.token));
  }, [dispatch, productState, authState]);

  return (
    <div className="flex flex-col ">
      <div id="title" className="bg-gray-300 px-4">
        <h4 className="">Products</h4>
      </div>

      {productState.status === "success" ? (
        <div className="flex flex-row ">
          <div
            className={`w-full grid ${
              productState.editModeActive
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
            } gap-4 p-4`}
          >
            {productState.productList.map((e, idx) => (
              <ProductComp key={`${e.id}-${idx}`} idx={idx} product={e} />
            ))}
          </div>
          {productState.editModeActive && productState.selectedProduct && (
            <EditProductView />
          )}
        </div>
      ) : productState.status === "loading" ? (
        <div>
          <UiSpinner />
        </div>
      ) : productState.status === "failed" ? (
        <div>Error</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductsView;
