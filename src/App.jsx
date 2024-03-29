// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./views/Login.jsx";
import VerifyOTP from "./views/VerifyOTP.jsx";
import Error404 from "./components/Error404.jsx";
import Dashboard from "./views/Dashboard.jsx";
import AddProducts from "./views/AddProducts.jsx";
import CategoryAndBrand from "./views/CategoryAndBrand.jsx";
import AddVariants from "./views/AddVariants.jsx";
import Products from "./views/Products.jsx";
import EditProductPage from "./views/EditProduct.jsx";
import ForgetPassword from "./views/ForgetPassword.jsx";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdatePassword from "./views/UpdatePassword.jsx";
import Users from "./views/Users.jsx";
import OrderList from "./views/OrderList.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<VerifyOTP />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/add-product"
            element={<ProtectedRoute Component={AddProducts} />}
          />
          <Route
            path="/add-variant"
            element={<ProtectedRoute Component={AddVariants} />}
          />
          <Route
            path="/category-and-brand"
            element={<ProtectedRoute Component={CategoryAndBrand} />}
          />
          <Route
            path="/products"
            element={<ProtectedRoute Component={Products} />}
          />
          <Route
            path="/edit-product/:productId"
            element={<ProtectedRoute Component={EditProductPage} />}
          />
          <Route path="/users" element={<ProtectedRoute Component={Users} />} />
          <Route
            path="/orders"
            element={<ProtectedRoute Component={OrderList} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
