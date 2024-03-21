import React from "react";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../redux/features/emailSlice";
import axios from "axios";

function Login() {
  const email = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsIncorrect, setFieldsIncorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgetPassword = async () => {
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/forgot-password",
        { email },
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        navigate("/forget-password");
      }
      if (response.status === 400) {
        alert("Email is required field");
      }
      if (response.status === 404) {
        alert("Admin not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async () => {
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/login",
        { email, password },
        { headers }
      );
      console.log("INside fun");
      console.log("below");

      if (response.status === 201) {
        navigate("/otp");
      } else if (response.status === 400) {
        setErrorMessage("Email and password both are required");
        setFieldsIncorrect(true);
      } else if (response.status === 404) {
        setErrorMessage("Admin not found");
        setFieldsIncorrect(true);
      } else if (response.status === 401) {
        setErrorMessage("Invalid Credentials");
        setFieldsIncorrect(true);
      } else {
        setErrorMessage("Something Went Wrong");
        setFieldsIncorrect(true);
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        submitHandler();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [submitHandler]);

  return (
    <>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[350px] bg-white flex flex-col justify-center align-middle rounded-xl">
          <div>
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl font-sans mb-6">Login</h1>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="ml-8 mt-1">
                Email address:
              </label>
              <input
                className={`mx-8 mt-2 p-1 bg-input-bg ${
                  fieldsIncorrect ? "border-red-600" : "border-input-border"
                } border-2 rounded-md`}
                type="email"
                name="email"
                placeholder="albus.dumbledore@gmail.com"
                id="email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mx-8 mt-4">
                <label htmlFor="password">Password:</label>
                <span className="ml-2 text-slate-500 hover:underline hover:text-slate-700">
                  <Link onClick={handleForgetPassword}>Forget Password?</Link>
                </span>
              </div>
              <div className="relative flex flex-col">
                <input
                  className={`mx-8 mt-2 p-1 bg-input-bg ${
                    fieldsIncorrect ? "border-red-600" : "border-input-border"
                  } border-2 rounded-md pr-8`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="absolute right-12 top-6 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <FaRegEye
                    className="absolute right-12 top-6 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
              {fieldsIncorrect && (
                <div className="mx-8 text-sm text-red-600">{errorMessage}</div>
              )}
            </div>
            <div className="flex flex-col text-center">
              <button
                onClick={submitHandler}
                className="mx-8 mt-8 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
