import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/users" element={<h1>users</h1>}/>
      <Route path="/products" element={<h1>Products</h1>} />
      <Route path="/products/add" element={<h1>Add Product</h1>} />
      <Route path="/orders" element={<h1>orders</h1>}/>
      <Route path="/carts" element={<h1>carts</h1>}/>
      <Route path="/settings" element={<h1>settings</h1>}/>
      <Route path="*" element={<h1>page not found</h1>}/>


    </Routes>
  );
}

export default AppRoutes;
