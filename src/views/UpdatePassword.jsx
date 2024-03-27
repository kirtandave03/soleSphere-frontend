import React from "react";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [fieldsIncorrect, setFieldsIncorrrect] = useState(false);
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const onSubmit = async (data) => {
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/change-password",
        { email, password: data.password, confirmPassword: data.password2 },
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        navigate("/login");
      }
      if (response.status === 400) {
        setError("notSame", {
          message: "Passwords doesn't match",
        });
      }
      if (response.status === 401) {
        setError("unAuth", {
          message: "Unauthorized to change data",
        });
      }
    } catch (error) {
      console.error(error);
      //   navigate("/error");
    }
  };

  return (
    <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
      <div className="m-auto w-[560px] h-[350px] bg-white flex flex-col justify-center align-middle rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
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
                className={`mx-8 mt-2 p-1 bg-input-bg ${
                  fieldsIncorrect ? "border-red-600" : "border-input-border"
                } border-2 rounded-md pr-8`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field is required ",
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
            <label htmlFor="password2" className="ml-8 mt-1">
              Confirm Password:
            </label>
            <div className="relative flex flex-col">
              <input
                type={showPassword2 ? "text" : "password"}
                id="password2"
                className={`mx-8 mt-2 p-1 bg-input-bg ${
                  fieldsIncorrect ? "border-red-600" : "border-input-border"
                } border-2 rounded-md pr-8`}
                {...register("password2", {
                  required: {
                    value: true,
                    message: "This field is required ",
                  },
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
          {errors.notSame && (
            <div className="mx-8 text-red-600 text-sm">
              {errors.notSame.message}
            </div>
          )}
          {errors.unAuth && (
            <div className="mx-8 text-red-600 text-sm">
              {errors.unAuth.message}
            </div>
          )}
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
  );
};

export default UpdatePassword;
