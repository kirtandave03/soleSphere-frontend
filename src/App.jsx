import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Error404 from "./components/Error404";
import Otp from "./components/Otp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      <Error404 />
      <Otp />
    </>
  );
}

export default App;
