import React, { useState, useEffect } from "react";
import { BsList, BsX } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { FaClipboardList, FaHome, FaUsers } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaPalette, FaTags } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

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
      className="left-0 h-screen w-[10vw] flex min-w-[10vw] "
      style={{ position: "sticky", top: 0 }}
    >
      <div className="flex flex-col flex-grow bg-blue-400 text-white ">
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
          <div
            className="px-3 py-4 font-bold text-2xl text-left text-white cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            SoleSphere
          </div>
          <div className="flex flex-col">
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === ""
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("")}
            >
              <FaHome className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-7 text-left">Dashboard</div>
            </button>
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === "products"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("products")}
            >
              <GiConverseShoe className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-7 text-left">Products</div>
            </button>
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === "orders"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("orders")}
            >
              <FaClipboardList className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-7 text-left">Order List</div>
            </button>
            {/* <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "membership"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("membership")}
            >
              Membership
            </button> */}
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === "add-product"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("add-product")}
            >
              <AiOutlinePlusCircle className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-7 text-left">Add Product</div>
            </button>
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === "add-variant"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("add-variant")}
            >
              <FaPalette className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-7 text-left">Add Variant</div>
            </button>
            <button
              className={`p-4 rounded-r-2xl left-0 ${
                selectedButton === "category-and-brand"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("category-and-brand")}
            >
              <FaTags className="absolute mt-4 w-5 h-5" />
              <div className="ml-7 text-left">
                Categories
                <br />& Brand
              </div>
            </button>
            <button
              className={`p-4 rounded-r-2xl left-0 text-left ${
                selectedButton === "users"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("users")}
            >
              <FaUsers className="absolute mt-[0.15rem] w-5 h-5" />
              <div className="ml-8">Users</div>
            </button>
            {/* <button
              className={`p-4 rounded-r-xl ${
                selectedButton === "team"
                  ? "bg-white text-blue-400"
                  : "hover:bg-slate-100 hover:text-blue-400 text-white"
              }`}
              onClick={() => handleSelect("team")}
            >
              Team
            </button> */}
          </div>
          <button
            className={`p-4 rounded-r-2xl left-0 ${
              selectedButton === "logout"
                ? "bg-white text-blue-400"
                : "hover:bg-slate-100 hover:text-blue-400 text-white"
            }`}
            onClick={() => handleSelect("logout")}
          >
            <TbLogout2 className="absolute mt-[0.15rem] w-5 h-5" />
            <div className="ml-8 text-left">Logout</div>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
