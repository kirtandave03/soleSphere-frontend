import React, { useState, useEffect } from "react";
import { getOrders } from "../services/order.service";
import TopBar from "../layouts/TopBar";
import Navbar from "../layouts/Navbar";
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

  const fetchOrders = async () => {
    try {
      const response = await getOrders(rowsPerPage, page);
      console.log(response);
      const dataNeeded = response.data.data;

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
      console.log(orderDetails);
    } catch (error) {
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

  return (
    <div className="flex flex-col h-screen  bg-main-bg bg-cover bg-red-100">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="w-full flex-col">
          <div className="p-4 w-full">
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
                      <TableRow key={rowIndex}>
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
                        <TableCell style={{ textAlign: "center" }}>
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
                  count={orderDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(event, newPage) => handleChangePage(newPage)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
