import React from "react";
import Error404Img from "../assets/404.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  function handleSubmit() {
    console.log("back clicked");
    navigate(-1);
  }

  return (
    <>
      <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center font-semibold">
        <div className="m-auto w-[560px] h-[407.54px] bg-white flex flex-col justify-center items-center gap-8 align-middle rounded-xl">
          <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src={Error404Img}
              alt="404 image"
              className="w-[347px] h-[179px]"
            />
            <p className="text-3xl">Looks like you've got lost...</p>
          </div>
          <button
            onClick={handleSubmit}
            className="w-9/12 bg-[#4880FF] text-xl text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Error404;
