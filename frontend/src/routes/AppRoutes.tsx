import { Routes, Route, } from "react-router-dom";
import {
  loginRoute,
  notificationsTestRoutes,
  uiButtonsRoutes,
  uiSpinnerRoutes,
} from "../constants/routeConstants";
import { Customers, Home, Orders, Payments, Products } from "../data/navbarItems";
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
      <Route path={Home.route} element={<RequireAuth><HomeView title={Home.name}/></RequireAuth>}/>
      <Route path={Orders.route} element={<RequireAuth><OrdersView title={Orders.name}/></RequireAuth>} />
      <Route path={Products.route} element={<RequireAuth><ProductsView title={Products.name} /></RequireAuth>} />
      <Route path={Payments.route} element={<RequireAuth><PaymentsView title={Payments.name} /></RequireAuth>} />
      <Route path={Customers.route} element={<RequireAuth><CustomersView title={Customers.name} /></RequireAuth>} />
      <Route path={uiButtonsRoutes} element={<UiButtonsPage />} />
      <Route path={uiSpinnerRoutes} element={<UiSpinnerPage />} />
      <Route path={notificationsTestRoutes} element={<NotificationsTest />} />
      <Route path={loginRoute} element={<LoginView />} />
    </Routes>
  );
};

export default AppRoutes;
