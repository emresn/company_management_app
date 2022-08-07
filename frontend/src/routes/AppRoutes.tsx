import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  customersRoute,
  homeRoute,
  loginRoute,
  ordersRoute,
  paymentsRoute,
  productsRoute,
  uiButtonsRoutes,
  uiSpinnerRoutes,
} from "../constants/routeConstants";
import { AppState } from "../redux/store";
import AuthView from "../views/auth/AuthView";
import CustomersView from "../views/customers/CustomersView";
import HomeView from "../views/home/HomeView";
import OrdersView from "../views/orders/OrdersView";
import PaymentsView from "../views/payments/PaymentsView";
import ProductsView from "../views/products/ProductsView";
import UiButtonsPage from "../views/test/UiButtons";
import UiSpinnerPage from "../views/test/UiSpinner";

type Props = {};

const AppRoutes = (props: Props) => {
  const authState = useSelector((state: AppState) => state.auth);
  const location = useLocation()
  

  if (!authState.isAuthenticated && location.pathname !== loginRoute) {
    return  <Navigate to={loginRoute} />
  } else {
    return (
      <Routes>
        <Route path={homeRoute} element={<HomeView />} />
        <Route path={ordersRoute} element={<OrdersView />} />
        <Route path={productsRoute} element={<ProductsView />} />
        <Route path={paymentsRoute} element={<PaymentsView />} />
        <Route path={customersRoute} element={<CustomersView />} />
        <Route path={uiButtonsRoutes} element={<UiButtonsPage />} />
        <Route path={uiSpinnerRoutes} element={<UiSpinnerPage />} />
        <Route path={loginRoute} element={<AuthView />} />
      </Routes>
    );
  }
};

export default AppRoutes;
