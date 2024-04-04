import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { HiMiniUsers } from "react-icons/hi2";
import { IoCube } from "react-icons/io5";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { getStats } from "../services/dashboard.service";
import capitalize from "../utils/capitalize";
import Lottie from "lottie-react-web";
import animationData from "../utils/loading.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [products, setProducts] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState("");
  const [dataset, setDataset] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
    "Image",
    "Product ID",
    "Product Name",
    "Category",
    "Brand",
    "Sold",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStats();
        console.log(response.data.data.mostSoldProducts);

        if (response.status === 200) {
          setTotalUsers(response.data.data.totalActiveUsers);
          setTotalOrders(response.data.data.totalOrders);
          setTotalSales(response.data.data.totalSales);
          setTotalPendingOrders(response.data.data.totalPendingOrders);
          setTotalRevenue(response.data.data.totalRevenue);
          setProducts(response.data.data.mostSoldProducts);
          setLoading(false);

          if (response.data.data.totalRevenue.length > 0) {
            setSelectedYear(response.data.data.totalRevenue[0]._id);
            setYearlyRevenue(
              response.data.data.totalRevenue[0].totalYearlyRevenue
            );
          }
        }
      } catch (error) {
        setLoading(false);
        if (error?.response) {
          alert("Something went wrong while fetching stats");
        }
      }
    };

    fetchData();
  }, []);

  const chartSetting = {
    yAxis: [
      {
        label: "",
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

  useEffect(() => {
    const selectedYearData = totalRevenue.find(
      (yearData) => yearData._id === selectedYear
    );

    let dataset = [];
    if (selectedYearData) {
      const monthlyRevenueMap = new Map(
        selectedYearData.monthlyRevenue.map(({ month, totalRevenue }) => [
          month,
          totalRevenue,
        ])
      );

      for (let month = 1; month <= 12; month++) {
        const totalRevenue = monthlyRevenueMap.get(month) || 0;
        dataset.push({
          soleSphere: totalRevenue,
          month: getMonthName(month),
        });
      }
    }

    setYearlyRevenue(
      selectedYearData ? selectedYearData.totalYearlyRevenue : 0
    );
    setDataset(dataset);
  }, [selectedYear, totalRevenue]);

  function getMonthName(monthNumber) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1];
  }

  const valueFormatter = (value) => `${value}Rs.`;

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
              autoplay: true,
            }}
            width={200}
            height={200}
          />
        </div>
      ) : (
        <div className="flex flex-col h-screen bg-main-bg bg-cover">
          {/* <TopBar /> */}
          <div className="flex flex-grow">
            <div className="fixed">
              <Navbar />
            </div>
            <div className="ml-[21vh] mt-8 flex-grow flex flex-col">
              {/* <h1 className="font-bold mx-2 mb-2 text-lg">Dashboard</h1> */}
              <div className="flex flex-col justify-center items-center">
                <div className="w-11/12 flex justify-between gap-8 text-lg">
                  <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                    <div>
                      <p className="">Total Users</p>
                      <p className="font-semibold">{totalUsers}</p>
                    </div>
                    <div className="bg-[#b8b7fc] p-2 rounded-xl">
                      <HiMiniUsers className="w-7 h-7 text-[#8280ff] rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                    <div>
                      <p className="">Total Orders</p>
                      <p className="font-semibold">{totalOrders}</p>
                    </div>
                    <div className="bg-[#ffe098] p-2 rounded-xl">
                      <IoCube className="w-7 h-7 text-[#fec53d] rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                    <div>
                      <p className="">Total Revenue</p>
                      <p className="font-semibold">₹{totalSales}</p>
                    </div>
                    <div className="bg-[#beffdf] p-2 rounded-xl">
                      <FaChartLine className="w-7 h-7 text-[#4ad991] rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-white py-5 px-7 flex justify-center items-center rounded-md shadow-md gap-7">
                    <div>
                      <p className="">
                        Total Pending
                        <br /> Orders
                      </p>
                      <p className="font-semibold">{totalPendingOrders}</p>
                    </div>
                    <div className="bg-[#ffbca4] p-2 rounded-xl">
                      <FaClockRotateLeft className="w-7 h-7 text-[#ff9066] rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-12 mt-3 bg-white rounded-md flex shadow-md relative">
                {totalRevenue.length > 0 && (
                  <>
                    <div className="absolute top-2 left-2 font-semibold text-lg">
                      Total Sales: ₹{yearlyRevenue}
                    </div>
                    <select
                      className="absolute top-2 right-2 bg-white border border-gray-300 px-3 py-1 rounded-md"
                      onChange={(e) =>
                        setSelectedYear(parseInt(e.target.value))
                      }
                      value={selectedYear}
                    >
                      <option value="">Select Year</option>
                      {totalRevenue.map((yearData) => (
                        <option key={yearData._id} value={yearData._id}>
                          {yearData._id}
                        </option>
                      ))}
                    </select>
                    <div className="w-full flex justify-center items-center">
                      {dataset.length > 0 && (
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
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="mx-12 mt-5 mb-3">
                <div className="font-semibold mb-2 text-lg">
                  Most Sold Products
                </div>
                <div className="mx-2 flex justify-center"></div>
                <TableContainer className="shadow-md" component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            key={index}
                            style={{ fontWeight: "600", textAlign: "center" }}
                          >
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {products.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          onClick={() => handleClick(row.orderId)}
                        >
                          <TableCell style={{ textAlign: "center" }}>
                            <img
                              src={row.image_url[0][0]}
                              alt="Product Image"
                              style={{
                                maxWidth: "75px",
                                maxHeight: "75px",
                              }}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {row._id}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.productName)}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.category[0])}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {capitalize(row.brand[0])}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {row.totalQuantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orderDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
