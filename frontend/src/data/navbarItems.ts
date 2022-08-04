import { NavbarItem } from "../models/navbarItemModel";

const Home: NavbarItem = {
  alt: "home",
  name: "Home",
  src: "./assets/home.svg",
};

const Orders: NavbarItem = {
  alt: "order",
  name: "Orders",
  src: "./assets/order.svg",
};
const Payments: NavbarItem = {
  alt: "payment",
  name: "Payments",
  src: "./assets/payment.svg",
};
const Products: NavbarItem = {
  alt: "product",
  name: "Products",
  src: "./assets/product.svg",
};
const Customers: NavbarItem = {
  alt: "customer",
  name: "Customers",
  src: "./assets/customer.svg",
};

export const NavbarItems: NavbarItem[] = [
  Home,
  Orders,
  Payments,
  Products,
  Customers,
];
