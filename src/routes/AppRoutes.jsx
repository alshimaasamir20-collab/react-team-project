import { Routes, Route } from "react-router-dom";
import App from "../App";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import Orders from "../pages/Orders";
import Carts from "../pages/Carts";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="carts" element={<Carts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;