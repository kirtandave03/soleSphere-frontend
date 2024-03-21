import React from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { HiMiniUsers } from "react-icons/hi2";
import { IoCube } from "react-icons/io5";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="flex-grow flex flex-col">
          <h1 className="font-bold mx-2 mb-2 text-lg">Dashboard</h1>
          <div className="flex flex-col justify-center items-center">
            <div className="w-11/12 flex justify-between gap-8 text-lg">
              <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                <div>
                  <p className="font-semibold">Total Users</p>
                  <p>40689</p>
                </div>
                <div className="bg-[#b8b7fc] p-1 rounded-xl">
                  <HiMiniUsers className="w-6 h-6 text-[#8280ff] rounded-lg" />
                </div>
              </div>
              <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                <div>
                  <p className="font-semibold">Total Orders</p>
                  <p>10293</p>
                </div>
                <div className="bg-[#ffe098] p-1 rounded-xl">
                  <IoCube className="w-6 h-6 text-[#fec53d] rounded-lg" />
                </div>
              </div>
              <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                <div>
                  <p className="font-semibold">Total Sales</p>
                  <p>$89000</p>
                </div>
                <div className="bg-[#beffdf] p-1 rounded-xl">
                  <FaChartLine className="w-6 h-6 text-[#4ad991] rounded-lg" />
                </div>
              </div>
              <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                <div>
                  <p className="font-semibold">
                    Total Pending
                    <br /> Orders
                  </p>
                  <p>2040</p>
                </div>
                <div className="bg-[#ffbca4] p-1 rounded-xl">
                  <FaClockRotateLeft className="w-6 h-6 text-[#ff9066] rounded-lg" />
                </div>
              </div>
            </div>
            {/* <div class="rounded-t-none rounded-b-sm p-2">
              <div class="relative overflow-hidden w-11/12">
                <canvas
                  className="inline-block align-baseline w-11/12 overflow-clip"
                  id="barChart"
                  style="height: 400px; width: 813px;"
                  height="800"
                  width="1626"
                ></canvas>
              </div>
            </div> */}
            <div>Most Sold Products Table</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
