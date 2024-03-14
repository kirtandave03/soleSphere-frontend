import React from "react";
import Navbar from "../layouts/Navbar";
import TopBar from "../layouts/TopBar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Navbar from "../layouts/Navbar";

function Products() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <TopBar />
      </div>
      <h1>Products</h1>

      <table>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Categroy</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Available Colours</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>response[0].image</td>
          <td>response[0].productName</td>
          <td>response[0].category.category</td>
          <td>response[0].discounted_price</td>
          <td></td>
          <td>response[0].colors</td>
          <td>
            <FaRegEdit />
            <RiDeleteBinLine />
          </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </table>
    </div>
  );
}

export default Products;
