import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductComp from "../../components/ProductComp";
import UiButton from "../../components/ui/UiButton";
import UiSpinner from "../../components/ui/UiSpinner";
import { useAppDispatch } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { FetchProductsAsync } from "../../services/product/fetchProducts";
import { switchAddMode } from "../../stores/productSlice";
import AddProductView from "./AddProductView";
import EditProductView from "./EditProductView";
type Props = {
  title :string
};
const ProductsView = ({title}: Props) => {
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
        <div className="flex flex-row justify-between items-center">
          <h4 className="">{title}</h4>
          <div onClick={() => dispatch(switchAddMode())}>
            <UiButton color="success" text="New Product" size="sm" />
          </div>
        </div>
      </div>

      {productState.status === "success" ? (
        <div className="flex flex-col sm:flex-row ">
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
          {productState.addModeActive && <AddProductView />}
        </div>
      ) : productState.status === "loading" ? (
        <div className="absolute top-1/3 left-1/2">
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
