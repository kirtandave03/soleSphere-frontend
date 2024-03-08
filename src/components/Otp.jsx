import React from "react";

const Otp = () => {
  return (
    <>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[307.54px] bg-white flex flex-col justify-center items-center gap-8 align-middle rounded-xl font-sans">
          <p className="text-3xl">Verify OTP</p>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <input
              className="w-1/3 mx-8 mt-2 p-1 bg-input-bg border-input-border border-2 rounded-md text-center"
              type="password"
              name="otp"
              id="otp"
              placeholder="Enter otp here"
            />
            <div className=" w-full flex flex-col justify-center items-center">
              <button className="w-1/3 bg-[#4880FF] text-xl text-white rounded-lg">
                Verify
              </button>
              <span>
                <a href="" className="text-sm text-slate-500">
                  Re-send OTP
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
