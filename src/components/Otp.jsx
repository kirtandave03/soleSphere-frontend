import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Otp = ({
  email,
  text,
  service,
  navigation,
  status,
  resendNavigation,
}) => {
  const [OTP, setOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectOTP, setIncorrectOTP] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adminNotFound, setAdminNotFound] = useState(false);
  const navigate = useNavigate();

  const handleOTPchange = (event) => {
    setOTP(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async () => {
    setIsSubmitted(true);
    const data = { email, otp: OTP };

    try {
      console.log(OTP);
      console.log(email);

      const response = await service(data);

      console.log(response.status);
      console.log(response);

      if (response.status === status) {
        status === 201 &&
          localStorage.setItem("auth-token", response.data.data.accessToken);
        console.log(response.data.data.accessToken);
        navigate(`${navigation}`);
        console.log("it worked");
      } else {
      }
    } catch (error) {
      if (error) {
        setIncorrectOTP(true);
        setIsSubmitted(false);
        console.log(incorrectOTP, isSubmitted);
      }
      console.error(error);
    }
  };

  const handleResend = async () => {
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/get-otp",
        { email },
        { headers }
      );

      if (response.status === 201) {
        navigate(`${resendNavigation}`);
      }
    } catch (error) {
      if (error.response.status === 400) {
        navigate("/login");
      }
      if (error.response.status === 404) {
        x;
        setAdminNotFound(true);
      }
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

  useEffect(() => {
    let timer;
    if (adminNotFound) {
      timer = setTimeout(() => {
        setAdminNotFound(false);
      }, 5000);
    }

    if (incorrectOTP) {
      timer = setTimeout(() => {
        setIncorrectOTP(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [adminNotFound, incorrectOTP]);

  return (
    <div className="relative">
      <div className="w-full absolute flex justify-center items-center">
        {incorrectOTP && (
          <Alert
            severity="error"
            className="w-full"
            onClose={() => {
              setIncorrectOTP(false);
            }}
          >
            Incorrect OTP!
          </Alert>
        )}
        {adminNotFound && (
          <Alert
            severity="error"
            className="w-full"
            onClose={() => {
              setAdminNotFound(false);
            }}
          >
            Admin not found!
          </Alert>
        )}
      </div>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[307.54px] bg-white flex flex-col justify-center items-center gap-8 align-middle rounded-xl font-sans">
          <div className="font-bold text-2xl flex justify-center items-center">
            <span className="text-[#4880FF]">SoleSphere</span>
          </div>
          <p className="text-2xl">{text}</p>
          <div className=" relative w-full flex flex-col justify-center items-center gap-4">
            <input
              className={`w-1/3 mx-8 p-1 bg-input-bg ${
                incorrectOTP ? "border-red-600" : "border-input-border"
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
                className="absolute right-[12.3rem] top-5 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEye
                className="absolute right-[12.3rem] top-5 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
            <div className=" w-full flex flex-col justify-center items-center">
              <button
                disabled={isSubmitted}
                onClick={submitHandler}
                className={`w-1/3 disabled:opacity-50 bg-[#4880FF] text-lg text-center text-white rounded-lg hover:bg-[#417aff] hover:shadow-md`}
              >
                Verify
              </button>
              <span className="flex flex-col text-center">
                <Link
                  onClick={handleResend}
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
    </div>
  );
};

export default Otp;
