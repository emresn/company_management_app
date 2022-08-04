import { Routes, Route } from "react-router-dom";
import { homeRoute, ordersRoute } from "../constants/routeConstants";
import HomeView from "../views/home/HomeView";
import OrderView from "../views/orders/OrderView";


type Props = {}

const AppRoutes = (props: Props) => {
  return (
    <Routes>
         <Route path={homeRoute} element={<HomeView />} />
         <Route path={ordersRoute} element={<OrderView />} />

    </Routes>
  )
}

export default AppRoutes