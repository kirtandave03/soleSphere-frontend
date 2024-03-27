import Navbar from "../layouts/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../layouts/TopBar";
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
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

function Products() {
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://solesphere-backend.onrender.com/api/v1/products"
      );
      const responseData = response.data;

      console.log(response);
      setRows(responseData.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const accessToken = localStorage.getItem("auth-token");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const onEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const onDelete = async (productName) => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": accessToken,
    };

    try {
      const response = await axios.delete(
        "https://solesphere-backend.onrender.com/api/v1/products",
        {
          headers,
          data: { productName },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        alert("Product Deleted Successfully");
      } else if (response.status === 404) {
        alert("Product Not Found");
      }

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredData = rows.filter((row) =>
      row.productName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRows(filteredData);
    setPage(0);
  };

  const dataToDisplay = searchQuery ? filteredRows : rows;

  return (
    <div className="flex flex-col h-screen bg-main-bg bg-cover">
      <TopBar />
      <div className="flex flex-grow">
        <Navbar />
        <div className="p-4 w-full">
          <h1 className="font-bold text-lg my-2 ml-4">Products</h1>

          <div className="rounded-t-none rounded-b-sm p-2 flex items-center">
            <TextField
              id="search"
              label="Search by Product Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={handleSearch}
                    ></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mb-4 overflow-y-hidden border border-gray-300 overflow-x-auto">
            <div className="w-full">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Category
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Brand
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Total Available Colors
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Average Rating
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "600", textAlign: "center" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataToDisplay
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <img
                              src={row.image}
                              alt="Product Image"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          </TableCell>
                          <TableCell>{row.productName}</TableCell>
                          <TableCell>{row.category.category}</TableCell>
                          <TableCell>{row.brand.brand}</TableCell>
                          <TableCell>{row.discounted_price}</TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {row.colors}
                          </TableCell>
                          <TableCell>
                            <TableCell
                              style={{
                                borderBottom:
                                  "0px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              {row.avgRating !== null
                                ? row.avgRating.toFixed(2)
                                : ""}
                            </TableCell>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="edit"
                              onClick={() => onEdit(row._id)}
                            >
                              <FaRegEdit />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => onDelete(row.productName)}
                            >
                              <RiDeleteBinLine />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dataToDisplay.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
