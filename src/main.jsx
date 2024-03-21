import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./views/Login.jsx";
import VerifyOTP from "./views/VerifyOTP.jsx";
import Error404 from "./components/Error404.jsx";
import Dashboard from "./views/Dashboard.jsx";
import AddProducts from "./views/AddProducts.jsx";
import Membership from "./views/Membership.jsx";
import CategoryAndBrand from "./views/CategoryAndBrand.jsx";
import AddVariants from "./views/AddVariants.jsx";
import ForgetPassword from "./views/ForgetPassword.jsx";
import UpdatePassword from "./views/UpdatePassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <VerifyOTP />,
  },
  {
    path: "/error",
    element: <Error404 />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/add-product",
    element: <AddProducts />,
  },
  {
    path: "/add-variant",
    element: <AddVariants />,
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
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
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
