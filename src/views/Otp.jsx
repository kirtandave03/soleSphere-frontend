import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const email = useSelector((state) => state.email);
  const [OTP, setOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectOTP, setIncorrectOTP] = useState(false);
  const navigate = useNavigate();

  const handleOTPchange = (event) => {
    setOTP(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async () => {
    const headers = { "Content-Type": "application/json" };

    try {
      console.log(OTP);
      console.log(email);

      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/verify-otp",
        { email, otp: OTP },
        { headers }
      );

      if (response.status === 201) {
        localStorage.setItem("auth-token", response.data.data.accessToken);
        navigate("/");
      } else {
        setIncorrectOTP(true);
      }
    } catch (error) {
      console.error(error);
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
        <div className="m-auto w-[560px] h-[307.54px] bg-white flex flex-col justify-center items-center gap-8 align-middle rounded-xl font-sans">
          <p className="text-3xl">Verify OTP</p>
          <div className=" relative w-full flex flex-col justify-center items-center gap-4">
            <input
              className={`w-1/3 mx-8 mt-2 p-1 bg-input-bg ${
                incorrectOTP
                  ? "border-red-600"
                  : "border-input-border placeholder: pr-14"
              } border-2 rounded-md text-center`}
              type={showPassword ? "text" : "password"}
              name="otp"
              id="otp"
              placeholder="Enter otp here"
              value={OTP}
              onChange={handleOTPchange}
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-[12.3rem] top-[1.65rem] transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEye
                className="absolute right-[12.3rem] top-[1.65rem] transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
            <div className=" w-full flex flex-col justify-center items-center">
              <button
                onClick={submitHandler}
                className="w-1/3 bg-[#4880FF] text-lg text-center text-white rounded-lg hover:bg-[#417aff] hover:shadow-md"
              >
                Verify
              </button>
              <span className="flex flex-col text-center">
                <Link
                  to="/otp"
                  className="text-sm text-slate-500 hover:underline hover:text-slate-700"
                >
                  Re-send OTP
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
