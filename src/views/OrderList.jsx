import React, { useState, useEffect } from "react";
import { getOrders, getOrderDetails } from "../services/order.service";
import TopBar from "../layouts/TopBar";
import Navbar from "../layouts/Navbar";
import OrderDetails from "../components/OrderDetails";
import capitalize from "../utils/capitalize";
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
import Lottie from "lottie-react-web";
import animationData from "../utils/loading.json";

function OrderList() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [columns, setColumns] = useState([
    "Order ID",
    "User Name",
    "Product Name", // Moved "Product Name" to the third index
    "Transaction ID",
    "Date",
    "Order Status",
  ]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [details, setDetails] = useState(null);
  const [totalOrders, setTotalOrder] = useState();
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders(rowsPerPage, page);
      // console.log(response);
      const dataNeeded = response.data.data.orders;

      const formattedOrders = dataNeeded.map((order) => {
        const {
          _id: orderId,
          transaction_id: transactionId,
          user,
          createdAt: date,
          products,
          orderStatus,
        } = order;

        const productNames = products.map((product) => product.productName);

        return {
          orderId,
          userName: user.email,
          productName: capitalize(productNames.join(", ")),
          transactionId,
          date: date.slice(0, 10),
          orderStatus,
        };
      });

      setOrderDetails(formattedOrders);
      setTotalOrder(response.data.data.totalOrders);
      setLoading(false);
      // console.log(orderDetails);
    } catch (error) {
      setLoading(false);
      console.error("error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [rowsPerPage, page]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = async (orderId) => {
    try {
      setLoading(true);
      const response = await getOrderDetails(orderId);
      const responseNeeded = response.data.data;

      // console.log(responseNeeded);

      setDetails(responseNeeded);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

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
        <div className="flex flex-col h-screen  bg-main-bg bg-cover bg-red-100">
          {/* <TopBar /> */}
          <div className="flex flex-grow">
            <div className="fixed">
              <Navbar />
            </div>
            <div className="ml-[21vh] w-full flex-col">
              <div
                className={`p-4 w-full ${
                  details
                    ? "opacity-25 pointer-events-none cursor-not-allowed"
                    : ""
                }`}
              >
                <h1 className="font-bold text-lg my-2 ml-4">Order Lists</h1>
                <div>
                  <TableContainer component={Paper}>
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
                        {orderDetails.map((row, rowIndex) => (
                          <TableRow
                            className="cursor-pointer"
                            key={rowIndex}
                            onClick={() => handleClick(row.orderId)}
                          >
                            <TableCell style={{ textAlign: "center" }}>
                              {row.orderId}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {row.userName}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {row.productName}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {row.transactionId}
                            </TableCell>
                            <TableCell
                              style={{ textAlign: "center", minWidth: "7rem" }}
                            >
                              {row.date}
                            </TableCell>
                            <TableCell
                              style={{
                                textAlign: "center",
                                borderRadius: "1rem",
                                color:
                                  row.orderStatus === "Completed"
                                    ? "rgb(22 163 74)"
                                    : row.orderStatus === "Pending"
                                    ? "#F89A00"
                                    : "#F00010",
                              }}
                            >
                              {row.orderStatus}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={totalOrders || orderDetails.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(event, newPage) =>
                        handleChangePage(newPage)
                      }
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableContainer>
                </div>
              </div>
              <div>
                {details && (
                  <OrderDetails order={details} setDetails={setDetails} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
