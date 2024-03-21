import React from "react";
import Otp from "../components/Otp";
import { useSelector } from "react-redux";

const ForgetPassword = () => {
  const email = useSelector((state) => state.email);
  return (
    <div>
      <Otp
        email={email}
        text="Forget Password?"
        link="https://solesphere-backend.onrender.com/api/v1/auth/forgot-password-verify"
        navigation="/update-password"
        status={200}
        resendNavigation="/forget-password"
      />
    </div>
  );
};

export default ForgetPassword;
