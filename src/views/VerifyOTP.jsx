import React from "react";
import Otp from "../components/Otp";
import { useSelector } from "react-redux";

const VerifyOTP = () => {
  const email = useSelector((state) => state.email);
  return (
    <Otp
      email={email}
      text="Verify OTP"
      link="https://solesphere-backend.onrender.com/api/v1/auth/verify-otp"
      navigation="/dashboard"
      status={201}
      resendNavigation="/otp"
    />
  );
};

export default VerifyOTP;
