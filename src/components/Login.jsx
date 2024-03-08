import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (event) => {
    // event.preventDefault();

    console.log(email);
    console.log(password);
  };

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
                className="mx-8 mt-2 p-1 bg-input-bg border-input-border border-2 rounded-md"
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
                <span className="ml-2 text-slate-500">
                  <Link to="">Forget Password?</Link>
                </span>
              </div>
              <div className="relative flex flex-col">
                <input
                  className="mx-8 mt-2 p-1 bg-input-bg border-input-border border-2 rounded-md pr-8"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <FaRegEye
                    className="absolute right-12 top-6 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleShowPassword}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <Link
                to="/otp"
                onClick={submitHandler}
                className="mx-8 mt-8 p-1 bg-login-bg bg-cover text-white py-1 px-3 rounded-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
