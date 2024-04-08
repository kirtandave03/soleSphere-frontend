import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updatePassword } from "../services/auth.service";
import Alert from "@mui/material/Alert";
import Lottie from "lottie-react-web";
import animationData from "../utils/loading.json";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [sww, setSww] = useState(false);
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await updatePassword({
        email: email,
        password: data.password,
        confirmPassword: data.password2,
      });

      console.log(response.status);

      if (response.status === 200) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        // Handle password validation error
        setError("password", {
          type: "manual",
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });
      }
      if (error.response.status === 401) {
        setUnauthorized(true);
      }
      if (error.response.status === 500) {
        setSww(true);
      }
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
              autoplay: true,
            }}
            width={200}
            height={200}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="w-full absolute flex justify-center items-center">
            {unauthorized && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setUnauthorized(false);
                }}
              >
                Unauthorized to change password!
              </Alert>
            )}
            {sww && (
              <Alert
                severity="error"
                className="w-full"
                onClose={() => {
                  setSww(false);
                }}
              >
                Something went wrong! Please try again later.
              </Alert>
            )}
          </div>
          <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
            <div className="m-auto w-[560px] h-[370px] bg-white flex flex-col justify-center align-middle rounded-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-2xl mt-1 mb-2 flex justify-center items-center">
                    <span className="text-[#4880FF]">SoleSphere</span>
                  </div>
                  <h1 className="font-bold text-2xl font-sans mb-6">
                    Update Password
                  </h1>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password" className="ml-8 mt-1">
                    Password:
                  </label>
                  <div className="relative flex flex-col">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={`mx-8 mt-2 p-1 bg-input-bg border-input-border border-2 rounded-md pr-8 ${
                        errors.password ? "border-red-600" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required.",
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long.",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                        },
                      })}
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
                  {errors.password && (
                    <div className="mx-8 text-red-600 text-sm">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password2" className="ml-8 mt-2">
                    Confirm Password:
                  </label>
                  <div className="relative flex flex-col">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      id="password2"
                      className={`mx-8 mt-2 p-1 bg-input-bg border-input-border border-2 rounded-md pr-8 ${
                        errors.password2 ? "border-red-600" : ""
                      }`}
                      {...register("password2", {
                        required: "Confirm Password is required.",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match.",
                      })}
                    />
                    {showPassword2 ? (
                      <FaRegEyeSlash
                        className="absolute right-12 top-6 transform -translate-y-1/2 cursor-pointer"
                        onClick={toggleShowPassword2}
                      />
                    ) : (
                      <FaRegEye
                        className="absolute right-12 top-6 transform -translate-y-1/2 cursor-pointer"
                        onClick={toggleShowPassword2}
                      />
                    )}
                  </div>
                  {errors.password2 && (
                    <div className="mx-8 text-red-600 text-sm">
                      {errors.password2.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-center">
                  <input
                    disabled={isSubmitting}
                    type="submit"
                    value="Update Password"
                    className="mx-8 mt-8 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md hover:cursor-pointer disabled:opacity-50"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
