import { Routes, Route, } from "react-router-dom";
import {
  customersRoute,
  homeRoute,
  loginRoute,
  notificationsTestRoutes,
  ordersRoute,
  paymentsRoute,
  productsRoute,
  uiButtonsRoutes,
  uiSpinnerRoutes,
} from "../constants/routeConstants";
import LoginView from "../views/auth/LoginView";
import CustomersView from "../views/customers/CustomersView";
import HomeView from "../views/home/HomeView";
import OrdersView from "../views/orders/OrdersView";
import PaymentsView from "../views/payments/PaymentsView";
import ProductsView from "../views/products/ProductsView";
import NotificationsTest from "../views/test/NotificationsTest";
import UiButtonsPage from "../views/test/UiButtons";
import UiSpinnerPage from "../views/test/UiSpinner";
import RequireAuth from "./requireAuth";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path={homeRoute} element={<RequireAuth><HomeView /></RequireAuth>}/>
      <Route path={ordersRoute} element={<RequireAuth><OrdersView /></RequireAuth>} />
      <Route path={productsRoute} element={<RequireAuth><ProductsView /></RequireAuth>} />
      <Route path={paymentsRoute} element={<RequireAuth><PaymentsView /></RequireAuth>} />
      <Route path={customersRoute} element={<RequireAuth><CustomersView /></RequireAuth>} />
      <Route path={uiButtonsRoutes} element={<UiButtonsPage />} />
      <Route path={uiSpinnerRoutes} element={<UiSpinnerPage />} />
      <Route path={notificationsTestRoutes} element={<NotificationsTest />} />
      <Route path={loginRoute} element={<LoginView />} />
    </Routes>
  );
};

export default AppRoutes;
