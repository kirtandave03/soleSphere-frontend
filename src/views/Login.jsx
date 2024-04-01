import React from "react";
import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/features/emailSlice";
import { useForm } from "react-hook-form";
import { forgotPassword, login } from "../services/auth.service";
import Alert from "@mui/material/Alert";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldsIncorrect, setFieldsIncorrrect] = useState(false);
  const navigate = useNavigate();
  const [adminNotFound, setAdminNotFound] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [sww, setSww] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputval = watch("email", "");

  const handleForgetPassword = async () => {
    try {
      const response = await forgotPassword(inputval);

      console.log(response.status);

      if (response.status === 200) {
        dispatch(setEmail(inputval));
        navigate("/forget-password");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setEmailRequired(true);
      } else if (error.response.status === 404) {
        setAdminNotFound(true);
      } else {
        setSww(true);
      }
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    clearErrors();

    try {
      const response = await login({ email, password });

      console.log(response.status);

      if (response.status === 201) {
        dispatch(setEmail(email));
        navigate("/otp");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        setInvalidCredentials(true);
        setFieldsIncorrrect(true);
      } else if (error.response.status === 404) {
        setAdminNotFound(true);
        setFieldsIncorrrect(true);
      } else {
        setSww(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        onSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSubmit]);

  useEffect(() => {
    let timer;
    if (adminNotFound) {
      timer = setTimeout(() => {
        setAdminNotFound(false);
      }, 5000);
    }

    if (sww) {
      timer = setTimeout(() => {
        setSww(false);
      }, 5000);
    }

    if (invalidCredentials) {
      timer = setTimeout(() => {
        setInvalidCredentials(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [adminNotFound, sww, invalidCredentials]);

  return (
    <div className="relative">
      <div className="w-full absolute flex justify-center items-center">
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
        {invalidCredentials && (
          <Alert
            severity="error"
            className="w-full"
            onClose={() => {
              setInvalidCredentials(false);
            }}
          >
            Invalid Credentials!
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
        {emailRequired && (
          <Alert
            severity="error"
            className="w-full"
            onClose={() => {
              setEmailRequired(false);
            }}
          >
            Please enter the email id.
          </Alert>
        )}
      </div>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[360px] bg-white flex flex-col justify-center align-middle rounded-xl">
          <div className="font-bold text-2xl mb-4 flex justify-center items-center">
            <span className="text-[#4880FF]">SoleSphere</span>
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
                value="Log In"
                className="disabled:opacity-50 cursor-pointer mx-8 mt-8 p-1 bg-[#4880FF] bg-cover text-white py-1 px-3 rounded-md hover:bg-[#417aff] hover:shadow-md"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
