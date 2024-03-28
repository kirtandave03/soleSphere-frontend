import React from "react";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEmail } from "../redux/features/emailSlice";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsIncorrect, setFieldsIncorrrect] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleChange = (e) => {
  //   setInputval(e.target.value);
  //   console.log(inputval);
  // };

  const inputval = watch("email", "");

  const handleForgetPassword = async () => {
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/forgot-password",
        { email: inputval },
        { headers }
      );

      console.log(response.status);

      if (response.status === 200) {
        dispatch(setEmail(inputval));
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

  const onSubmit = async (data) => {
    const { email, password } = data;
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "https://solesphere-backend.onrender.com/api/v1/auth/login",
        { email, password },
        { headers }
      );

      console.log(response.status);

      if (response.status === 201) {
        dispatch(setEmail(email));
        navigate("/otp");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError("invalid", {
          message: "Invalid Credentials!",
        });
        setFieldsIncorrrect(true);
      } else if (error.response.status === 404) {
        setError("noAdmin", {
          message: "Admin not found!",
        });
        setFieldsIncorrrect(true);
      } else if (error.response.status === 400) {
        setError("noMailNoPass", {
          message: "Email and password both are required!",
        });
        setFieldsIncorrrect(true);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[360px] bg-white flex flex-col justify-center align-middle rounded-xl">
          <div className="font-bold text-2xl mb-4 flex justify-center items-center">
            <span className="text-[#4880FF]">Sole</span>Sphere
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl font-sans mb-3">Login</h1>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="ml-8 mt-1">
                Email address:
              </label>
              <input
                type="email"
                id="email"
                className={`mx-8 mt-2 p-1 bg-input-bg ${
                  fieldsIncorrect ? "border-red-600" : "border-input-border"
                } border-2 rounded-md`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required ",
                  },
                })}
              />
              {errors.email && (
                <div className="mx-8 text-red-600 text-sm">
                  {errors.email.message}
                </div>
              )}
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
                {errors.password && (
                  <div className="mx-8 text-red-600 text-sm">
                    {errors.password.message}
                  </div>
                )}
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
              {errors.noMailNoPass && (
                <div className="mx-8 text-red-600 text-sm">
                  {errors.noMailNoPass.message}
                </div>
              )}
              {errors.invalid && (
                <div className="mx-8 text-red-600 text-sm">
                  {errors.invalid.message}
                </div>
              )}
              {errors.noAdmin && (
                <div className="mx-8 text-red-600 text-sm">
                  {errors.noAdmin.message}
                </div>
              )}
              {errors.noIdea && (
                <div className="mx-8 text-red-600 text-sm">
                  {errors.noIdea.message}
                </div>
              )}
            </div>
            <div className="flex flex-col text-center">
              <input
                disabled={isSubmitting}
                type="submit"
                value="Sign In"
                className="disabled:opacity-50 cursor-pointer mx-8 mt-8 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
