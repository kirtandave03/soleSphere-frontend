import React from "react";
import Otp from "../components/Otp";
import { useSelector } from "react-redux";
import { loginOtp } from "../services/auth.service";

const VerifyOTP = () => {
  const email = useSelector((state) => state.email);
  console.log(email);
  return (
    <Otp
      email={email}
      text="Verify OTP"
      service={loginOtp}
      navigation="/"
      status={201}
      resendNavigation="/otp"
    />
  );
};

export default VerifyOTP;
