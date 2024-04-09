import React from "react";
import Otp from "../components/Otp";
import { useSelector } from "react-redux";
import { loginOtp } from "../services/auth.service";

const VerifyOTP = () => {
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  // console.log(email);
  // console.log(password);
  return (
    <Otp
      email={email}
      password={password}
      text="Verify OTP"
      service={loginOtp}
      navigation="/"
      status={201}
    />
  );
};

export default VerifyOTP;
