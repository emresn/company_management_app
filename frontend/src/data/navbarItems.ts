import {
  customersRoute,
  homeRoute,
  ordersRoute,
  paymentsRoute,
  productsRoute,
} from "../constants/routeConstants";
import { NavbarItem } from "../models/navbarItemModel";

export const Home: NavbarItem = {
  alt: "home",
  name: "Dashboard",
  src: "/assets/home.svg",
  route: homeRoute,
};

export const Orders: NavbarItem = {
  alt: "order",
  name: "Orders",
  src: "/assets/order.svg",
  route: ordersRoute,
};
export const Payments: NavbarItem = {
  alt: "payment",
  name: "Payments",
  src: "/assets/payment.svg",
  route: paymentsRoute,
};
export const Products: NavbarItem = {
  alt: "product",
  name: "Products",
  src: "/assets/product.svg",
  route: productsRoute,
};
export const Customers: NavbarItem = {
  alt: "customer",
  name: "Customers",
  src: "/assets/customer.svg",
  route: customersRoute,
};

export const NavbarItems: NavbarItem[] = [
  Home,
  Orders,
  Payments,
  Products,
  Customers,
];
