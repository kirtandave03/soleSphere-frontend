import { useState } from "react";
import "./App.css";
import Login from "./views/Login";
import Error404 from "./components/Error404";
import Otp from "./components/Otp";
import Dashboard from "./views/Dashboard";
import AddProducts from "./views/AddProducts";

function App() {
  const [email, setEmail] = useState("");

  const handleEmailChange = () => {
    console.log("App");
    // setEmail(newEmail);
  };

  return (
    <>
      {/* <Login onSubmit={handleEmailChange} />
      <Error404 />
      <Otp email={email} /> */}
      {/* <Navbar /> */}
      {/* <Dashboard /> */}
      <Protec></Protec>
      <AddProducts />
    </>
  );
}

export default App;
