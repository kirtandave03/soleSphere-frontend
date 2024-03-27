import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { HiMiniUsers } from "react-icons/hi2";
import { IoCube } from "react-icons/io5";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalSales, setTotalSales] = useState();
  const [totalPendingOrders, setTotalPendingOrders] = useState();

  useEffect(() => {
    const totalUser = async () => {
      const response = await axios.get("");

      if (response.status === 201) {
        setTotalUsers();
      }
    };

    const totalOrder = async () => {
      const response = await axios.get("");

      if (response.status === 201) {
        setTotalOrders();
      }
    };

    const totalSale = async () => {
      const response = await axios.get("");

      if (response.status === 201) {
        setTotalSales();
      }
    };

    const totalPending = async () => {
      const response = await axios.get("");

      if (response.status === 201) {
        setTotalPendingOrders();
      }
    };

    totalOrder();
    totalSale();
    totalUser();
    totalPending();
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: "Revenue(Rs.)",
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const dataset = [
    {
      soleSphere: 59000,
      month: "Jan",
    },
    {
      soleSphere: 50000,
      month: "Fev",
    },
    {
      soleSphere: 47000,
      month: "Mar",
    },
    {
      soleSphere: 54000,
      month: "Apr",
    },
    {
      soleSphere: 57000,
      month: "May",
    },
    {
      soleSphere: 60000,
      month: "June",
    },
    {
      soleSphere: 59000,
      month: "July",
    },
    {
      soleSphere: 65000,
      month: "Aug",
    },
    {
      soleSphere: 51000,
      month: "Sept",
    },
    {
      soleSphere: 60000,
      month: "Oct",
    },
    {
      soleSphere: 67000,
      month: "Nov",
    },
    {
      soleSphere: 61000,
      month: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value}Rs.`;

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
          </div>
          <div className="mx-12 mt-3 bg-white rounded-md flex shadow">
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                {
                  dataKey: "soleSphere",
                  valueFormatter,
                  color: "#ffc029",
                },
              ]}
              {...chartSetting}
            />
          </div>
          <div>Most Sold Products Table</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
