// main.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/Login.jsx";
import Otp from "./components/Otp.jsx";
import Error404 from "./components/Error404.jsx";

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
]);
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
