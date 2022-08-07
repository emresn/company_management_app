import { Routes, Route } from "react-router-dom";
import { customersRoute, homeRoute, ordersRoute, paymentsRoute, productsRoute, uiButtonsRoutes, uiSpinnerRoutes } from "../constants/routeConstants";
import CustomersView from "../views/customers/CustomersView";
import HomeView from "../views/home/HomeView";
import OrdersView from "../views/orders/OrdersView";
import PaymentsView from "../views/payments/PaymentsView";
import ProductsView from "../views/products/ProductsView";
import UiButtonsPage from "../views/test/UiButtons";
import UiSpinnerPage from "../views/test/UiSpinner";


type Props = {}

const AppRoutes = (props: Props) => {
  return (
    <Routes>
         <Route path={homeRoute} element={<HomeView />} />
         <Route path={ordersRoute} element={<OrdersView />} />
         <Route path={productsRoute} element={<ProductsView />} />
         <Route path={paymentsRoute} element={<PaymentsView />} />
         <Route path={customersRoute} element={<CustomersView />} />
         <Route path={uiButtonsRoutes} element={<UiButtonsPage />} />
         <Route path={uiSpinnerRoutes} element={<UiSpinnerPage />} />


    </Routes>
  )
}

export default AppRoutes