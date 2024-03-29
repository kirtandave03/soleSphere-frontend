import React from "react";
import Otp from "../components/Otp";
import { useSelector } from "react-redux";
import { forgetPasswordOtp } from "../services/auth.service";

const ForgetPassword = () => {
  const email = useSelector((state) => state.email);
  // console.log(email);
  return (
    <div>
      <Otp
        email={email}
        text="Forget Password?"
        service={forgetPasswordOtp}
        navigation="/update-password"
        status={200}
        resendNavigation="/forget-password"
      />
    </div>
  );
};

export default ForgetPassword;
