import {
  customersRoute,
  homeRoute,
  ordersRoute,
  paymentsRoute,
  productsRoute,
} from "../constants/routeConstants";
import { NavbarItem } from "../models/navbarItemModel";

const Home: NavbarItem = {
  alt: "home",
  name: "Home",
  src: "/assets/home.svg",
  route: homeRoute,
};

const Orders: NavbarItem = {
  alt: "order",
  name: "Orders",
  src: "/assets/order.svg",
  route: ordersRoute,
};
const Payments: NavbarItem = {
  alt: "payment",
  name: "Payments",
  src: "/assets/payment.svg",
  route: paymentsRoute,
};
const Products: NavbarItem = {
  alt: "product",
  name: "Products",
  src: "/assets/product.svg",
  route: productsRoute,
};
const Customers: NavbarItem = {
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
