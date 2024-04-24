import React from "react";
import convertFlutterToHexFormat from "../utils/convertFlutterToHexFormat";
import capitalize from "../utils/capitalize";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";

function OrderDetails({ order, setDetails }) {
  console.log(order);
  return (
    <div className="w-2/5 absolute right-0 top-0 flex-col justify-between bg-white p-4 shadow-lg transition-all duration-500">
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Order ID: #{order._id}</h2>
          <button
            className="text-red-500 text-xl"
            onClick={() => setDetails(null)}
          >
            X
          </button>
        </div>
        <h4 className="font-semibold">Order details</h4>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">Created at</h4>
          <p>{order.createdAt.slice(0, 10)}</p>
        </div>
        <div>
          <h4 className="font-semibold">Payment</h4>
          <p
            className={`${
              order.paymentStatus === "Captured"
                ? "text-[#16A34A]"
                : order.paymentStatus === "Pending"
                ? "text-[#F89A00]"
                : order.paymentStatus === "Failed"
                ? "text-[#F00010]"
                : "text-[#6fd4f3]"
            }`}
          >
            {order.paymentStatus}
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Status</h4>
          <p
            className={`
              ${
                order.orderStatus === "Delivered"
                  ? "text-[#16A34A]"
                  : order.orderStatus === "Pending"
                  ? "text-[#F89A00]"
                  : "text-[#F00010]"
              }
            `}
          >
            {order.orderStatus}
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex-col">
        <h4 className="font-semibold">Customer</h4>
        <p>
          <div className="font-medium inline">Customer ID:</div> #
          {order.user._id}
        </p>
        <p>
          <div className="font-medium inline">Customer Email:</div>{" "}
          {order.user.email}
        </p>
      </div>
      <hr className="my-2" />
      <div>
        <h4 className="font-semibold">Items</h4>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "600", textAlign: "left" }}>
                  Image
                </TableCell>
                <TableCell style={{ fontWeight: "600", textAlign: "left" }}>
                  Product
                </TableCell>
                <TableCell style={{ fontWeight: "600", textAlign: "center" }}>
                  Quantity
                </TableCell>
                <TableCell style={{ fontWeight: "600", textAlign: "left" }}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products &&
                order.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={product.image_url}
                        alt="undefined"
                        className="w-20 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-left">
                          {product.productName === undefined
                            ? "undefined"
                            : capitalize(product.productName)}
                        </div>
                        <div className="flex gap-2 items-center">
                          <div
                            style={{
                              backgroundColor: `${convertFlutterToHexFormat(
                                product.color
                              )}`,
                              width: "1.25rem",
                              height: "1.25rem",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div>
                            {product.product_id.sizeType === undefined
                              ? "undefined"
                              : product.product_id.sizeType}{" "}
                            {product.size === undefined
                              ? "undefined"
                              : product.size}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.quantity === undefined
                        ? "undefined"
                        : product.quantity}
                    </TableCell>
                    <TableCell>
                      ₹
                      {product.discounted_price === undefined
                        ? "undefined"
                        : product.discounted_price}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <hr className="my-2" />
      <div>
        <h4 className="font-semibold">Payment</h4>
        <div className="flex justify-between">
          <div>Subtotal: </div>
          <div>₹{Number(order.totalAmount) + Number(order.totalDiscount)}</div>
        </div>
        <div className="flex justify-between">
          <div>Discount: </div>
          <div>- ₹{order.totalDiscount}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping cost: </div>
          <div>+ ₹{order.totalDiscount >= 500 ? 0 : 40}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <div>Total: </div>₹{order.totalAmount}
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
}

export default OrderDetails;
