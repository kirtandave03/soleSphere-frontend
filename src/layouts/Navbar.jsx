import React, { useState, useEffect } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState("dashboard");
  const [bigScreen, setBigScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
        setBigScreen(false);
      } else {
        setIsOpen(true);
        setBigScreen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname.substring(1);
    setSelectedButton(path);
  }, [location]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selected) => {
    if (selected == "logout") {
      localStorage.removeItem("auth-token");
      navigate("/login");
    } else {
      setSelectedButton(selected);
      navigate("/" + selected);
    }
  };

  return (
    <div
      className=" fixed top-0 left-0 h-full w-[10vw] flex min-w-[10vw] "
      style={{ position: "sticky", top: 0 }}
    >
      <div className="flex flex-col bg-white text-black ">
        {bigScreen ? (
          ""
        ) : (
          <div className="flex items-center justify-center">
            <button className="p-4" onClick={handleToggle}>
              {isOpen ? <BsX size={24} /> : <BsList size={24} />}
            </button>
          </div>
        )}
        <nav
          className={`flex flex-col justify-between ${isOpen ? "" : "hidden"}`}
        >
          <div className="p-4 font-bold text-xl text-[#4880FF]">SoleSphere</div>
          <div className="flex flex-col">
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === ""
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("")}
            >
              Dashboard
            </button>
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "products"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("products")}
            >
              Products
            </button>
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "orders"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("orders")}
            >
              Order List
            </button>
            {/* <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "membership"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("membership")}
            >
              Membership
            </button> */}
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "add-product"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("add-product")}
            >
              Add Product
            </button>
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "add-variant"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("add-variant")}
            >
              Add Variant
            </button>
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "category-and-brand"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("category-and-brand")}
            >
              Categories
              <br />& Brand
            </button>
            <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "users"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("users")}
            >
              Users
            </button>
            {/* <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "team"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect("team")}
            >
              Team
            </button> */}
          </div>
          <button
            className={`p-4 rounded-r-xl ${
              selectedButton === "logout"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleSelect("logout")}
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
