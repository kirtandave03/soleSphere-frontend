import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./views/Login.jsx";
import Otp from "./views/Otp.jsx";
import Error404 from "./components/Error404.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Products from "./views/Products.jsx";
import AddProducts from "./views/AddProducts.jsx";
import Membership from "./views/Membership.jsx";
import CategoryAndBrand from "./views/CategoryAndBrand.jsx";
import EditProduct from "./views/EditProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/error",
    element: <Error404 />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/add-product",
    element: <AddProducts />,
  },
  {
    path: "/membership",
    element: <Membership />,
  },
  {
    path: "/category-and-brand",
    element: <CategoryAndBrand />,
  },
  {
    path: `/edit-product/:productId`,
    element: <EditProduct />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
